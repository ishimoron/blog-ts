import { Box, Modal, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { addUser } from '../../store/posts/user.slice'

const ModalComponent = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [user, setUser] = useState<string | null>(null)
	const dispatch = useAppDispatch()
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
	}
	useEffect(() => {
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser)
			setUser(parsedUser)
			dispatch(addUser(parsedUser))
		}
		if (!storedUser) {
			setOpen(true)
		}
	}, [dispatch])

	const handleKeyPress = (
		event: React.KeyboardEvent<HTMLInputElement>
	): void => {
		if (event.key === 'Enter') {
			if (user && user.trim() !== '') {
				// Проверяем user на существование и не пустую строку
				dispatch(addUser(user))
				setOpen(false)
			}
		}
	}
	return (
		<Modal
			open={open}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<Typography id='modal-modal-title' variant='h6' component='h2'>
					Please write your username please
				</Typography>
				<TextField
					label='username'
					variant='standard'
					fullWidth
					value={user || ''}
					onChange={e => setUser(e.target.value)}
					onKeyDown={handleKeyPress}
				/>
			</Box>
		</Modal>
	)
}

export default ModalComponent
