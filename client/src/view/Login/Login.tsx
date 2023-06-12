import styles from './Login.module.scss'
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseAuth } from '@/utils/FirebaseConfig'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useStateProvider } from '@/context/StateContext'
import { REDUCER_CASES } from '@/context/constants'
import { CHECK_USER_ROUTE } from '@/utils/ApiRoutes'

export const Login = () => {
  const router = useRouter()
  const [{ userInfo }, dispatch] = useStateProvider()

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    const { 
      user: { displayName: name, email, photoURL: profileImage }
    } = await signInWithPopup(firebaseAuth, provider)

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email })

        if (!data.status) {
          dispatch({ type: REDUCER_CASES.SET_NEW_USER, newUser: true })
          dispatch({
            type: REDUCER_CASES.SET_USER_INFO,
            userInfo: { 
              name, 
              email, 
              profileImage, 
              status: '',
            }
          })
          router.push('/onboarding')
        }
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div>
        {/* <Image 
          src={ImageLogo}
          alt='Logo'
          width={300}
          height={300}
        /> */}
        <button
          className={styles.btn}
          onClick={handleLogin}
        >
          <FcGoogle className={styles.icon} />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  )
}
