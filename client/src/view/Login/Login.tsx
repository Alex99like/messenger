import Image from 'next/image'
import styles from './Login.module.scss'
import ImageLogo from '@/assets/google.svg'
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseAuth } from '@/utils/FirebaseConfig'

export const Login = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider)
    console.log(user)
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
