import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { prisma } from '#app/utils/db.server.ts'
import { useOptionalUser } from '#app/utils/user.ts'
import { Main, Sidebar } from '../../../components/layout'

export async function loader({ params }: LoaderFunctionArgs) {
	const owner = await prisma.user.findFirst({
		select: {
			id: true,
			name: true,
			username: true,
			image: { select: { id: true } },
			notes: { select: { id: true, title: true } },
		},
		where: { username: params.username },
	})

	invariantResponse(owner, 'Owner not found', { status: 404 })

	return json({ owner })
}

export default function NotesRoute() {
	const data = useLoaderData<typeof loader>()
	const user = useOptionalUser()
	const isOwner = user?.id === data.owner.id
	const ownerDisplayName = data.owner.name ?? data.owner.username
	return (
		<>
			<Sidebar>
				<h1 className="py-3 text-center text-base font-bold md:text-lg lg:text-left lg:text-2xl">
					<Link to={`/users/${data.owner.username}`}>
						{ownerDisplayName}'s Notes
					</Link>
				</h1>
				<ul className="overflow-y-auto overflow-x-hidden pb-12">
					{isOwner ? (
						<Sidebar.NavItem to="new">
							<Icon name="plus">New Note</Icon>
						</Sidebar.NavItem>
					) : null}
					{data.owner.notes.map(note => (
						<Sidebar.NavItem key={note.id} to={note.id}>
							{note.title}
						</Sidebar.NavItem>
					))}
				</ul>
			</Sidebar>

			<Main>
				<Outlet />
			</Main>
		</>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>No user with the username "{params.username}" exists</p>
				),
			}}
		/>
	)
}
