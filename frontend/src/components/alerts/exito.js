import Swal from "sweetalert2";

const exito = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Exito",
    confirmButtonColor: "#57B134",
  });
};

export default exito;
