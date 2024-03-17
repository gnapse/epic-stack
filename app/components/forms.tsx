import { useInputControl } from '@conform-to/react'
import React, { forwardRef, useId } from 'react'
import { Checkbox, type CheckboxProps } from './ui/checkbox.tsx'
import { Input } from './ui/input.tsx'
import { Label } from './ui/label.tsx'

export type ListOfErrors = Array<string | null | undefined> | null | undefined

export function ErrorList({
	id,
	errors,
}: {
	errors?: ListOfErrors
	id?: string
}) {
	const errorsToRender = errors?.filter(Boolean)
	if (!errorsToRender?.length) return null
	return (
		<ul id={id} className="flex flex-col gap-1">
			{errorsToRender.map(e => (
				<li key={e} className="text-[10px] text-foreground-destructive">
					{e}
				</li>
			))}
		</ul>
	)
}

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label: React.ReactNode
	errors?: ListOfErrors
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	function TextField({ label, errors, className, ...props }: TextFieldProps) {
		const fallbackId = useId()
		const id = props.id ?? fallbackId
		const errorId = errors?.length ? `${id}-error` : undefined
		return (
			<div className={className}>
				<Label htmlFor={id}>{label}</Label>
				<Input
					id={id}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					{...props}
				/>
				{errorId ? (
					<div className="min-h-[32px] px-4 pb-3 pt-1">
						<ErrorList id={errorId} errors={errors} />
					</div>
				) : null}
			</div>
		)
	},
)

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label: React.ReactNode
	errors?: ListOfErrors
	className?: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	function TextArea({ label, errors, className, ...props }: TextAreaProps) {
		const fallbackId = useId()
		const id = props.id ?? props.name ?? fallbackId
		const errorId = errors?.length ? `${id}-error` : undefined
		return (
			<div className={className}>
				<Label htmlFor={id}>{label}</Label>
				<textarea
					id={id}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-input-invalid"
					{...props}
				/>
				<div className="min-h-[32px] px-4 pb-3 pt-1">
					{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
				</div>
			</div>
		)
	},
)

export function CheckboxField({
	id,
	label,
	errors,
	className,
	...props
}: {
	id?: string
	label: string
	errors?: ListOfErrors
	name: string
	form: string
	value?: string
} & Omit<CheckboxProps, 'name' | 'form' | 'value'>) {
	const { key, defaultChecked, ...checkboxProps } = props
	const fallbackId = useId()
	const checkedValue = props.value ?? 'on'
	const input = useInputControl({
		key,
		name: props.name,
		formId: props.form,
		initialValue: defaultChecked ? checkedValue : undefined,
	})
	const errorId = errors?.length ? `${id}-error` : undefined

	return (
		<div className={className}>
			<div className="flex gap-2">
				<Checkbox
					{...checkboxProps}
					label={label}
					id={id ?? fallbackId}
					aria-invalid={errorId ? true : undefined}
					aria-describedby={errorId}
					checked={input.value === checkedValue}
					onChange={event => {
						input.change(event.target.checked ? checkedValue : '')
						props.onChange?.(event)
					}}
					onFocus={event => {
						input.focus()
						props.onFocus?.(event)
					}}
					onBlur={event => {
						input.blur()
						props.onBlur?.(event)
					}}
				/>
			</div>
			<div className="px-4 pb-3 pt-1">
				{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
			</div>
		</div>
	)
}
