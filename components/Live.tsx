import { useMyPresence, useOthers } from "@/liveblocks.config"
import LiveCursors from "./cursor/LiveCursors"
import { useCallback, useState } from "react";
import CursorChat from "./cursor/CursorChat";
import { CursorMode } from "@/types/type";

const Live = () => {
    const [cursorState, setCursorState] = useState({
        mode:CursorMode.Hidden
    })
    const others = useOthers();
    const [{cursor}, updateMyPresence] = useMyPresence() as any;

    const handlePointerMove = useCallback((event:React.PointerEvent)=>{
        event.preventDefault();

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({cursor:{x, y}})
    }, [])

    const handlePointerLeave = useCallback((event:React.PointerEvent)=>{
        setCursorState({mode:CursorMode.Hidden})
        updateMyPresence({cursor:null, message:null})
    }, [])

    const handlePointerDown = useCallback((event:React.PointerEvent)=>{
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({cursor:{x, y}})
    }, [])

  return (
    <div
    onPointerMove={handlePointerMove}
    onPointerLeave={handlePointerLeave}
    onPointerDown={handlePointerDown}
    className="h-[100vh] w-full flex-center "
    >
        <h1 className="text-2xl text-white text-center">Enigma: The Figma Clone</h1>
        {cursor && <CursorChat
        cursor = {cursor}
        cursorState = {cursorState}
        setCursorState = {setCursorState}
        updateMyPresence = {updateMyPresence}
        
         />}
        <LiveCursors others={others}/>
    </div>
  )
}

export default Live