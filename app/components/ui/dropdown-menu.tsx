import {
	Menu as MenuContent,
	MenuProvider,
	MenuButton,
	MenuItem,
	MenuItemCheckbox,
	MenuItemRadio,
	MenuSeparator,
	type MenuItemProps,
	type MenuProps as MenuContentProps,
	type MenuItemCheckboxProps,
	type MenuItemRadioProps,
	type MenuSeparatorProps,
	MenuItemCheck,
} from '@ariakit/react'
import { forwardRef } from 'react'

import { cn } from '#app/utils/misc.tsx'

const DropdownMenu = MenuProvider

const DropdownMenuTrigger = MenuButton

const DropdownMenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
	function DropdownMenuContent({ className, gutter = 4, ...props }, ref) {
		return (
			<MenuContent
				ref={ref}
				gutter={gutter}
				className={cn(
					'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					className,
				)}
				{...props}
			/>
		)
	},
)

const MENU_ITEM_CLASS_NAME =
	'px-2 py-1.5 relative flex select-none items-center rounded-sm text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[active-item]:bg-accent data-[active-item]:text-accent-foreground data-[disabled]:opacity-50'

const DropdownMenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
	function DropdownMenuItem({ className, ...props }, ref) {
		return (
			<MenuItem
				ref={ref}
				className={cn(MENU_ITEM_CLASS_NAME, className)}
				{...props}
			/>
		)
	},
)

const DropdownMenuCheckboxItem = forwardRef<
	HTMLDivElement,
	MenuItemCheckboxProps
>(function DropdownMenuCheckboxItem(
	{ className, children, checked, ...props },
	ref,
) {
	return (
		<MenuItemCheckbox
			ref={ref}
			className={cn(
				MENU_ITEM_CLASS_NAME,
				'flex items-center gap-1.5',
				className,
			)}
			checked={checked}
			{...props}
		>
			<MenuItemCheck className="inline h-[1em] w-[1em] self-center text-body-md" />
			{children}
		</MenuItemCheckbox>
	)
})

const DropdownMenuRadioItem = forwardRef<HTMLDivElement, MenuItemRadioProps>(
	function DropdownMenuRadioItem({ className, children, ...props }, ref) {
		return (
			<MenuItemRadio
				ref={ref}
				className={cn(
					MENU_ITEM_CLASS_NAME,
					'flex items-center gap-1.5',
					className,
				)}
				{...props}
			>
				<MenuItemCheck className="inline h-[1em] w-[1em] self-center text-body-md" />
				{children}
			</MenuItemRadio>
		)
	},
)

const DropdownMenuSeparator = forwardRef<HTMLHRElement, MenuSeparatorProps>(
	function DropdownMenuSeparator({ className, ...props }, ref) {
		return (
			<MenuSeparator
				ref={ref}
				className={cn('-mx-1 my-1 h-px bg-muted', className)}
				{...props}
			/>
		)
	},
)

function DropdownMenuShortcut({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
			{...props}
		/>
	)
}

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
}
