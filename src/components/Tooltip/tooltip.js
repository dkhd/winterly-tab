import React, { useState } from "react";
import "./tooltip.css";

function Tooltip(props) {

    const [active, setActive] = useState(false);

    const showToolTip = () => {
        setActive(true);
    }

    const hideToolTip = () => {
        setActive(false);
    }

    return (
        <div className="tooltip-container"
            onMouseEnter={showToolTip}
            onMouseLeave={hideToolTip}
        >
            {props.children}
            {active && (
                <div className="tooltip bg-gray-700">
                    <p className="text-gray-50">{props.tooltip}</p>
                 </div>
            )}
        </div>
    );
}

export default Tooltip;