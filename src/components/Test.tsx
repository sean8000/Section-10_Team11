import React, { useState } from "react";
import "./Test.css";

function Test() {
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
                <div
                    className="widget"
                    draggable
                    onDragStart={(e) => handleOnDrag(e, "Widget A")}
                >
                    Player 1
                </div>
                <div
                    className="widget"
                    draggable
                    onDragStart={(e) => handleOnDrag(e, "widget B")}
                >
                    Player 2
                </div>
                <div
                    className="widget"
                    draggable
                    onDragStart={(e) => handleOnDrag(e, "widget C")}
                >
                    Player 3
                </div>
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
