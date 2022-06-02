import Swal from 'sweetalert2';

const MySwal = () => {
  Swal.fire({
    title: '헬로',
    text: '바이',
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: '후아유',
  }).then((result) => {
    if (result.isConfirmed) {
      // history.push('/login');
    }
  });
};

export default MySwal;
