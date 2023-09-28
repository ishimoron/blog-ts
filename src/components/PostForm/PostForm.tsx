import { Textarea } from '@mui/joy'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { addPost } from '../../store/posts/posts.slice'
import { IPosts } from '../../types/types'
import styles from './style.module.css'
const PostForm = () => {
	const [post, setPost] = useState<string>('')
	const [title, setTitle] = useState<string>('')
	const author = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.user)

	const postChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPost(e.target.value)
	}

	const titleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.target.value)
	}

	const handlePosts = () => {
		if (post && title) {
			const newPost: IPosts = {
				createdAt: new Date().toLocaleString(),
				id: Date.now(),
				text: post,
				author,
				title,
			}
			dispatch(addPost(newPost))
			setPost('')
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.width}>
				<h1 className={styles.title}>
					Welcome <span>{user}</span>
				</h1>
				<TextField
					label='Title'
					variant='outlined'
					size='small'
					onChange={titleChange}
					fullWidth
				/>
				<Textarea
					onChange={postChange}
					value={post}
					minRows={6}
					aria-label='empty textarea'
					placeholder='Post'
					className={styles.mt}
				/>
				<Button
					onClick={handlePosts}
					variant='contained'
					color='primary'
					style={{ marginTop: '10px' }}
				>
					Add Post
				</Button>
			</div>
		</div>
	)
}

export default PostForm
