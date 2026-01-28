"use client";

export default function LiquidFilter() {
    return (
        <svg className="hidden">
            <defs>
                <filter id="liquid">
                    <feTurbulence
                        baseFrequency="0.01 0.02" // Adjusted for subtle liquid flow
                        numOctaves="1"
                        result="noise"
                        seed="1"
                    >
                        <animate
                            attributeName="baseFrequency"
                            dur="10s"
                            values="0.01 0.02;0.02 0.04;0.01 0.02"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="10" // Initial distortion amount
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
    );
}
