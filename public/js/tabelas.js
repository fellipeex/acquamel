function tabEnt(){
let varURL = "/getEMes/";
    $(document).ready(function () {
      $('#entrada').DataTable({
        ajax: {
          url: varURL,
          dataSrc: ""
        },
        columns: [
          {
            data: null,
            "render": function (data) {
              return '<a href="/infosEntrada/' + data.ped_id +
                '" class="btn btn-sm btn-outline-secondary" title="Ver mais"><i class="bi bi-eye-fill"></i></a><br>' + data.ped_id;
            }
          },
          { data: "ped_nome" },
          { data: "cli_id" },
          { data: "motorista_id" },
          { data: "ped_total" },
          { data: "ped_data" },
          {
            data: null,
            "render": function (data) {
              return '<a href="/editarEntrada/' + data.ped_id +
                '" class="btn btn-outline-secondary" title="Editar"><i class="bi bi-pencil-fill"></i></a>' +
                '<a class="btn btn-outline-danger" onclick="confirmar(' + data.ped_id + ' )" title="Apagar"><i class="bi bi-trash-fill"></i></a>'
            }
          }
        ],
        pageLenght: 5,
        lenghtMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']]
      });
    })
};