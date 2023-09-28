import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { deletePost } from '../../store/posts/posts.slice'
import styles from './style.module.css'

const PostList = () => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const [isEditing, setIsEditing] = useState<number | null>(null) // Состояние для отслеживания редактирования поста
	const [editedTitle, setEditedTitle] = useState<string>('') // Состояние для редактирования заголовка
	const [editedText, setEditedText] = useState<string>('') // Состояние для редактирования текста поста
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
		// По клику на кнопку "Cancel" отменяем редактирование и сбрасываем состояния
		setIsEditing(null)
		setEditedTitle('')
		setEditedText('')
	}

	const savePostChanges = (postId: number) => {
		// Здесь можно реализовать сохранение изменений поста
		// postId - это ID поста, который нужно сохранить
		// После сохранения изменений, можно вызвать setIsEditing(null) для завершения редактирования
		// Также, вы можете отправить обновленные заголовок (editedTitle) и текст (editedText) на сервер
	}

	return (
		<div className={styles.centered}>
			<div className={styles.container}>
				{posts.map(post => (
					<Paper key={post.id} elevation={3} className={styles.postContainer}>
						{/* Проверяем, редактируется ли данный пост, и отображаем соответствующий контент */}
						{isEditing === post.id ? (
							<Box display='flex' flexDirection='column'>
								<input
									type='text'
									value={editedTitle}
									onChange={e => setEditedTitle(e.target.value)}
									placeholder='Edit Title'
								/>
								<textarea
									rows={4}
									cols={50}
									value={editedText}
									onChange={e => setEditedText(e.target.value)}
									placeholder='Edit Text'
								></textarea>
								<Button
									variant='contained'
									onClick={() => savePostChanges(post.id)}
								>
									Save
								</Button>
								<Button variant='outlined' onClick={cancelEdit}>
									Cancel
								</Button>
							</Box>
						) : (
							<>
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
								{isAdmin && (
									<>
										<IconButton onClick={() => dispatch(deletePost(post.id))}>
											<MdOutlineDelete />
										</IconButton>
										<IconButton onClick={() => editPost(post.id)}>
											<AiOutlineEdit />
										</IconButton>
									</>
								)}
							</>
						)}
					</Paper>
				))}
			</div>
		</div>
	)
}

export default PostList
