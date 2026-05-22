const SUPABASE_URL = 'https://jlvumlkiecvmtldmgntl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdnVtbGtpZWN2bXRsZG1nbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMTk1ODcsImV4cCI6MjA2NTc5NTU4N30.o73mLA9EIdKYNDjAzDi2ENVi90JbCiOJMPnMIWRq-fw';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('btnLogin').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password: senha });

  if (error) {
    document.getElementById('erro').textContent = 'Login inválido';
  } else {
    location.href = 'admin.html';
  }
});
