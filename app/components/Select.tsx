import * as SelectPrimitive from "@radix-ui/react-select";
import clsx from "clsx";
import React from "react";

const SelectRoot = SelectPrimitive.Root;

const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        className={clsx(
            "text-sm flex h-9 w-full items-center justify-between whitespace-nowrap rounded-lg pl-4 pr-3 py-2 transition duration-500 ease-in-out bg-transparent border outline-none border-white/20 hover:border-white/50 focus:border-white/50",
            className,
        )}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.10em" height="1.10em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 15L12 18.75L15.75 15m-7.5-6L12 5.25L15.75 9">
                </path>
            </svg>
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
));

const SelectValue = SelectPrimitive.Value;

const SelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={clsx(
                "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-[#080808]/70 backdrop-blur-sm border-white/10",
                className,
            )}
            position={position}
            {...props}
        >
            <SelectPrimitive.Viewport
                className={clsx(
                    "p-1",
                    position === "popper" &&
                        "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                )}
            >
                {children}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
));

const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={clsx(
            "relative flex w-full cursor-default select-none items-center py-2 px-3 text-sm outline-none",
            className,
        )}
        {...props}
    >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
                    <path fill="currentColor" fillRule="evenodd" d="M16.705 4.153a.75.75 0 0 1 .142 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893l7.48-9.817a.75.75 0 0 1 1.05-.143" clipRule="evenodd">
                    </path>
                </svg>
            </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>
            {children}
        </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
));

export const Select = {
    Root: SelectRoot,
    Trigger: SelectTrigger,
    Value: SelectValue,
    Content: SelectContent,
    Item: SelectItem,
};