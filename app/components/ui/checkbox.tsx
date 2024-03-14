import {
	Checkbox as AriakitCheckbox,
	type CheckboxProps as AriakitCheckboxProps,
} from '@ariakit/react'

import * as React from 'react'

import { cn } from '#app/utils/misc.tsx'

export type CheckboxProps = Omit<AriakitCheckboxProps, 'type'> & {
	label: string
	type?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	function Checkbox({ className, id, label, ...props }, ref) {
		return (
			<label htmlFor={id} className="flex items-center gap-1">
				<AriakitCheckbox
					id={id}
					ref={ref}
					className={cn(
						'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
						className,
					)}
					{...props}
				/>
				<span className="self-center text-body-xs text-muted-foreground">
					{label}
				</span>
			</label>
		)
	},
)

export { Checkbox }
