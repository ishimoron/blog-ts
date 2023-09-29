import { Input, Textarea } from '@mui/joy'
import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { changePost, deletePost } from '../../store/posts/posts.slice'
import styles from './style.module.css'

const PostList = () => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const [isEditing, setIsEditing] = useState<number | null>(null)
	const [editedTitle, setEditedTitle] = useState<string>('')
	const [editedText, setEditedText] = useState<string>('')
	const posts = useAppSelector(state => state.posts)
	const user = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	useEffect(() => {
		setIsAdmin(false)
		posts.forEach(post => {
			if (post.author === user) {
				setIsAdmin(true)
				return
			}
		})
	}, [posts, user])

	const editPost = (postId: number) => {
		setIsEditing(postId)
		const postToEdit = posts.find(post => post.id === postId)
		if (postToEdit) {
			setEditedTitle(postToEdit.title)
			setEditedText(postToEdit.text)
		}
	}

	const cancelEdit = () => {
		setIsEditing(null)
		setEditedTitle('')
		setEditedText('')
	}

	const savePostChanges = (postId: number) => {
		if (editedText.trim() !== '' && editedTitle.trim() !== '') {
			const editPost = {
				title: editedTitle,
				text: editedText,
				id: postId,
				createdAt: new Date().toLocaleString(),
			}
			dispatch(changePost(editPost))
			setIsEditing(null)
		}
	}

	return (
		<div className={styles.centered}>
			<div className={styles.container}>
				{posts.map(post => (
					<Paper key={post.id} elevation={3} className={styles.postContainer}>
						{isEditing === post.id ? (
							<Box display='flex' flexDirection='column'>
								<Input
									type='text'
									value={editedTitle}
									onChange={e => setEditedTitle(e.target.value)}
									placeholder='Edit Title'
									sx={{
										'--Input-focusedInset': 'var(--any, )',
										'--Input-focusedThickness': '0.25rem',
										'--Input-focusedHighlight': 'rgba(13,110,253,.25)',
										'&::before': {
											transition: 'box-shadow .15s ease-in-out',
										},
										'&:focus-within': {
											borderColor: '#86b7fe',
										},
									}}
								/>
								<Textarea
									minRows={6}
									value={editedText}
									onChange={e => setEditedText(e.target.value)}
									placeholder='Edit Text'
									sx={{
										marginTop: '15px',
										'--Textarea-focusedInset': 'var(--any, )',
										'--Textarea-focusedThickness': '0.25rem',
										'--Textarea-focusedHighlight': 'rgba(13,110,253,.25)',
										'&::before': {
											transition: 'box-shadow .15s ease-in-out',
										},
										'&:focus-within': {
											borderColor: '#86b7fe',
										},
									}}
								/>
								<Button
									variant='contained'
									sx={{
										marginTop: '20px',
									}}
									onClick={() => savePostChanges(post.id)}
								>
									Save
								</Button>
								<Button
									sx={{
										marginTop: '10px',
									}}
									variant='outlined'
									onClick={cancelEdit}
								>
									Cancel
								</Button>
							</Box>
						) : (
							<Box
								display='flex'
								flexDirection='row'
								justifyContent='space-between'
							>
								<Box display='flex' flexDirection='column'>
									<Typography variant='h6' className={styles.postTitle}>
										{post.title}
									</Typography>
									<Typography variant='body1' className={styles.postText}>
										{post.text}
									</Typography>
									<Typography variant='caption' className={styles.postDate}>
										{post.createdAt}
									</Typography>
									<Typography variant='caption' className={styles.postAuthor}>
										{post.author}
									</Typography>
								</Box>
								{isAdmin && (
									<Box
										display='flex'
										flexDirection='column-reverse'
										justifyContent='center'
									>
										<IconButton onClick={() => dispatch(deletePost(post.id))}>
											<MdOutlineDelete />
										</IconButton>
										<IconButton onClick={() => editPost(post.id)}>
											<AiOutlineEdit />
										</IconButton>
									</Box>
								)}
							</Box>
						)}
					</Paper>
				))}
			</div>
		</div>
	)
}

export default PostList
