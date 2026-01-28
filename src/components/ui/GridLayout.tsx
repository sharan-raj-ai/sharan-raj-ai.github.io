"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface GridLayoutProps<T> {
    items: T[];
    renderItem: (item: T) => ReactNode;
    className?: string;
}

export default function GridLayout<T extends { id: string, span?: string }>({
    items,
    renderItem,
    className,
}: GridLayoutProps<T>) {
    return (
        <div className={clsx("grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[260px]", className)}>
            {items.map((item) => (
                <div key={item.id} className={clsx("relative", item.span || "md:col-span-1 md:row-span-1")}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
}
