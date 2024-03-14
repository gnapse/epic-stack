import * as React from 'react'

import { cn } from '#app/utils/misc.tsx'

export interface LabelProps
	extends React.InputHTMLAttributes<HTMLLabelElement> {
	htmlFor?: string
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
	{ className, ...props },
	ref,
) {
	return (
		<label
			ref={ref}
			className={cn(
				'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				className,
			)}
			{...props}
		/>
	)
})

export { Label }
