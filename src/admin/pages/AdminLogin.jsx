import { useState } from 'react';
import { Lock } from 'lucide-react';
import { TextField } from '../../components/ui/FormField';
import Button from '../../components/ui/Button';

// DEMO AUTH ONLY. There's no backend behind this yet, so it just checks
// the password against this constant. It's shown on-screen on purpose —
// this is a template, not a live store — but obviously replace this
// whole flow with a real login request once you have a backend.
const DEMO_PASSWORD = 'admin1234';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (password === DEMO_PASSWORD) {
      onLogin();
    } else {
      setError('رمز عبور اشتباه است');
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__icon">
          <Lock size={22} />
        </div>
        <h1>ورود به پنل مدیریت</h1>
        <p className="admin-login__hint">
          رمز عبور نمونه: <strong dir="ltr">{DEMO_PASSWORD}</strong>
        </p>
        <TextField
          id="admin-password"
          label="رمز عبور"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError('');
          }}
          error={error}
          autoFocus
        />
        <Button type="submit" fullWidth size="lg">
          ورود
        </Button>
      </form>
    </div>
  );
}
