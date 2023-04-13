import React, { useState } from "react";
import "./Test.css";
import { Player } from "../interfaces/player";

function Test() {
    const players = ["jerry", "terry", "larry"];
    const [widgets, setWidgets] = useState<string[]>([]);

    function handleOnDrag(e: React.DragEvent, widgetType: string) {
        e.dataTransfer.setData("widgetType", widgetType);
    }

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        //console.log("widgetType", widgetType);
        setWidgets([...widgets, widgetType]);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }
    return (
        <div className="Test">
            <div className="widgets">
                {players.map((curr: string) => (
                    <div
                        key="list"
                        className="widget"
                        draggable
                        onDragStart={(e) => handleOnDrag(e, curr)}
                    >
                        {curr}
                    </div>
                ))}
            </div>
            <div
                className="page"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
                {widgets.map((widget, index) => (
                    <div className="dropped-widget" key={index}>
                        {widget}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Test;
