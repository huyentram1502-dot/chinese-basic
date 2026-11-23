
import { supabase } from './supabase.js'

// Đăng ký tài khoản mới
export async function signUp(email, password) {
  email = email.trim().toLowerCase()

  if (!email || !password) {
    throw new Error('Vui lòng nhập email và mật khẩu')
  }

  if (password.length < 6) {
    throw new Error('Mật khẩu phải có ít nhất 6 ký tự')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    console.error('Lỗi đăng ký:', error)
    throw new Error(error.message)
  }

  return data
}

// Đăng nhập
export async function signIn(email, password) {
  email = email.trim().toLowerCase()

  if (!email || !password) {
    throw new Error('Vui lòng nhập email và mật khẩu')
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('Lỗi đăng nhập:', error)

    if (error.message === 'Invalid login credentials') {
      throw new Error(
        'Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại hoặc đăng ký tài khoản mới.'
      )
    }

    throw new Error(error.message)
  }

  return data
}

// Đăng xuất
export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}

// Lấy tài khoản đang đăng nhập
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()

  if (error) throw error

  return data.user
}

// Theo dõi trạng thái đăng nhập
export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session?.user ?? null)
  })
}

// Gửi email lấy lại mật khẩu
export async function resetPassword(email) {
  email = email.trim().toLowerCase()

  if (!email) {
    throw new Error('Vui lòng nhập email của bạn')
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: window.location.origin + '/reset-password.html'
    }
  )

  if (error) throw error

  return data
}

// Cập nhật mật khẩu mới
export async function updatePassword(newPassword) {
  if (!newPassword || newPassword.length < 6) {
    throw new Error('Mật khẩu phải có ít nhất 6 ký tự')
  }

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) throw error

  return data
}
