import './App.css'
import ModalComponent from './components/Modal/Modal'
import PostForm from './components/PostForm/PostForm'
import PostList from './components/PostList/PostList'

const App = () => {
	return (
		<>
			<PostForm />
			<ModalComponent />
			<PostList />
		</>
	)
}

export default App
