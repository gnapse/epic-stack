import {
	Form,
	Link,
	NavLink,
	useSubmit,
	type NavLinkProps,
} from '@remix-run/react'
import { useRef } from 'react'
import { cn, getUserImgSrc } from '../utils/misc'
import { useOptionalUser, useUser } from '../utils/user'
import { SearchBar } from './search-bar'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu.tsx'
import { Icon } from './ui/icon.tsx'

function UserDropdown() {
	const user = useUser()
	const submit = useSubmit()
	const formRef = useRef<HTMLFormElement>(null)
	return (
		<DropdownMenu defaultValues={{ sort: 'desc' }}>
			<DropdownMenuTrigger
				render={
					<Button variant="outline" className="flex items-center gap-2">
						<img
							className="h-8 w-8 rounded-full object-cover"
							alt={user.name ?? user.username}
							src={getUserImgSrc(user.image?.id)}
						/>
						<span className="text-body-sm font-bold">
							{user.name ?? user.username}
						</span>
					</Button>
				}
			/>
			<DropdownMenuContent gutter={8}>
				<DropdownMenuItem
					render={
						<Link prefetch="intent" to={`/users/${user.username}`}>
							<Icon className="text-body-md" name="avatar">
								Profile
							</Icon>
						</Link>
					}
				/>
				<DropdownMenuItem
					render={
						<Link prefetch="intent" to={`/users/${user.username}/notes`}>
							<Icon className="text-body-md" name="pencil-2">
								Notes
							</Icon>
						</Link>
					}
				/>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					// this prevents the menu from closing before the form submission is completed
					onSelect={event => {
						event.preventDefault()
						submit(formRef.current)
					}}
					render={
						<Form action="/logout" method="POST" ref={formRef}>
							<Icon className="text-body-md" name="exit">
								<button type="submit">Logout</button>
							</Icon>
						</Form>
					}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function Logo() {
	return (
		<div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-lg text-primary-foreground">
			{'{ }'}
		</div>
	)
}

function Main({ children }: { children: React.ReactNode }) {
	return (
		<main className="relative h-full flex-grow overflow-y-auto p-4 pt-0">
			{children}
		</main>
	)
}

function MainTitle({ children }: { children: React.ReactNode }) {
	return (
		<h1 className="sticky top-0 -mx-4 mb-2 border-b bg-background px-4 py-1 text-h2 lg:mb-6">
			{children}
		</h1>
	)
}
MainTitle.displayName = 'Main.Title'
Main.Title = MainTitle

function MainContent({ children }: { children: React.ReactNode }) {
	return <div className="flex h-full flex-col">{children}</div>
}
MainContent.displayName = 'Main.Content'
Main.Content = MainContent

function Sidebar({ children }: { children: React.ReactNode }) {
	return (
		<aside className="w-64 flex-shrink-0 overflow-y-auto bg-muted pt-4">
			{children}
		</aside>
	)
}

function SidebarNavItem({ className, children, ...props }: NavLinkProps) {
	return (
		<li>
			<NavLink
				{...props}
				preventScrollReset
				prefetch="intent"
				className={({ isActive }) =>
					cn(
						'line-clamp-2 px-2 py-2 text-base lg:text-xl',
						isActive && 'bg-secondary',
						className,
					)
				}
			>
				{children}
			</NavLink>
		</li>
	)
}
SidebarNavItem.displayName = 'Sidebar.NavItem'
Sidebar.NavItem = SidebarNavItem

function Layout({
	children,
	themeSwitch,
}: {
	children: React.ReactNode
	themeSwitch: React.ReactNode
}) {
	const user = useOptionalUser()

	return (
		<div className="flex h-screen flex-col justify-between overflow-hidden">
			<header className="w-full bg-secondary p-2">
				<nav className="flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap md:gap-2">
					<Link to="/" className="flex items-center gap-2">
						<Logo />
					</Link>

					<div className="ml-auto hidden max-w-sm flex-1 sm:block">
						<SearchBar status="idle" />
					</div>

					{user ? (
						<UserDropdown />
					) : (
						<Button
							variant="default"
							render={<Link to="/login">Log In</Link>}
						/>
					)}

					{themeSwitch}

					<div className="block w-full sm:hidden">
						<SearchBar status="idle" />
					</div>
				</nav>
			</header>

			<div className="flex flex-grow overflow-hidden">{children}</div>
		</div>
	)
}

function FloatingToolbar({ children }: { children: React.ReactNode }) {
	return (
		<div className="sticky bottom-0 left-0 right-0 flex items-center justify-end gap-2 rounded-lg bg-muted/80 p-4 pl-5 shadow-sm shadow-accent backdrop-blur-sm md:gap-4 md:pl-7">
			{children}
		</div>
	)
}

export { Layout, Sidebar, Main, FloatingToolbar }
