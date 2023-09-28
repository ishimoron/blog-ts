import { Paper, Typography } from '@mui/material'
import { useAppSelector } from '../../hooks/reduxHooks'
import styles from './style.module.css' // Импортируйте стили из CSS модуля

const PostList = () => {
	const posts = useAppSelector(state => state.posts)

	return (
		<div className={styles.centered}>
			<div className={styles.container}>
				{posts.map(post => (
					<Paper key={post.id} elevation={3} className={styles.postContainer}>
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
					</Paper>
				))}
			</div>
		</div>
	)
}

export default PostList
