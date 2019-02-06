
google.charts.load('current', {'packages':['corechart'], 'language': 'pt-br'});
google.charts.setOnLoadCallback(function() { drawChart(dados)});

var dataTable;
var options;
var chart;
var date_formatter;
function drawChart(dados) {
  dataTable = new google.visualization.DataTable();
  dataTable.addColumn('date', 'Medicao');
  dataTable.addColumn({type: 'string', role: 'annotation'});
  dataTable.addColumn('number', 'Estoque');
  dataTable.addColumn('number', 'Zona Superior');
  dataTable.addColumn('number', 'Limite Superior');
  dataTable.addColumn('number', 'Fora Limite Superior');
  dataTable.addColumn('number', 'Zero');
  dataTable.addColumn('number', 'Zona Inferior');
  dataTable.addColumn('number', 'Limite Inferior');
  dataTable.addColumn('number', 'Fora Limite Inferior');
  dataTable.addColumn('number', 'Estoque D-1');
  dataTable.addColumn('number', 'Projeção');

  for(i = 0; i < dados.length; i++){
    dataTable.addRow(dados[i]);
  }

  date_formatter = new google.visualization.DateFormat({ 
      pattern: "dd/MM HH:mm"
  });

  date_formatter.format(dataTable, 0);

  options = {
    hAxis: {
      format: "HH'h'",
      ticks: [
        new Date(2019, 1, 4, 6, 0),
        new Date(2019, 1, 4, 9, 0),
        new Date(2019, 1, 4, 12, 0),
        new Date(2019, 1, 4, 15, 0),
        new Date(2019, 1, 4, 18, 0),
        new Date(2019, 1, 4, 21, 0),
        new Date(2019, 1, 4, 24, 0),
        new Date(2019, 1, 5, 3, 0),
        new Date(2019, 1, 5, 6, 0),
        new Date(2019, 1, 5, 9, 0),
        new Date(2019, 1, 5, 12, 0),
        new Date(2019, 1, 5, 15, 0),
        new Date(2019, 1, 5, 18, 0),
        new Date(2019, 1, 5, 21, 0),
        new Date(2019, 1, 5, 24, 0),
        new Date(2019, 1, 6, 3, 0),
        new Date(2019, 1, 6, 6, 0)
      ],
      explorer: {actions: ['dragToZoom', 'rightClickToReset']}
    },
    
    vAxis: {
      ticks: [-7974, -5316, -2658, 0, 2658, 5316, 7974]
    },
    crosshair: { trigger: 'both', orientation: 'both' },
    curveType: 'function',
    animation:{
      startup: true,
      duration: 1000,
      easing: 'in',
    },
    focusTarget: 'category',
    isStacked: true,
    annotation: {
      1: {
          style: 'line'
      }
    },
    displayAnnotations: true,
    series: {
      0: {
        color: '#01579B',
        type: 'line',
        lineWidth: 4
      },
      1: {
        areaOpacity: 0.8,
        color: '#A5D6A7',
        visibleInLegend: false,
        enableInteractivity: false, 
        tooltip : false
      },
      2: {
        areaOpacity: 0.8,
        color: '#DCD68B',
        visibleInLegend: false,
        enableInteractivity: false,
        tooltip : false
      },
      3: {
        areaOpacity: 0.8,
        color: '#EF9A9A',
        visibleInLegend: false,
        enableInteractivity: false,
        tooltip : false
      },
      4: {
        areaOpacity: 0,
        color: '#b1d9aa',
        lineWidth: 2,
        visibleInLegend: false,
        enableInteractivity: false,
        tooltip : false
      },
      5: {
        areaOpacity: 0.8,
        color: '#A5D6A7',
        visibleInLegend: false,
        enableInteractivity: false,
        tooltip : false
      },
      6: {
        areaOpacity: 0.8,
        color: '#DCD68B',
        visibleInLegend: false,
        enableInteractivity: false,
        tooltip : false
      },
      7: {
        areaOpacity: 0.8,
        color: '#EF9A9A',
        visibleInLegend: false,
        enableInteractivity: false,
        tooltip : false
      },
      8: {
        color: '#01579B',
        type: 'line',
        visibleInLegend: true,
        pointShape: 'square',
        lineWidth: 4,
        visibleInLegend: false
      },
      9: {
        color: '#238e00',
        type: 'line',
        lineDashStyle: [4, 4],
        visibleInLegend: true,
        pointShape: 'diamond',
        lineWidth: 3
      }
    },
    seriesType: 'area'
  };
  chart = new google.visualization.ComboChart(document.getElementById('balanceamento'));
  chart.draw(dataTable, options);
}

var button = document.getElementById('adicionarPonto');
button.onclick = function() {  
  var indexMedicao = 0;
  var ultimaLinha = dataTable.getNumberOfRows();

  var ultimaMedicao = dataTable.getValue(ultimaLinha - 1, indexMedicao);
  var copiedDate = new Date(ultimaMedicao);
  copiedDate.setMinutes(ultimaMedicao.getMinutes()+30);

  var estoqueRandomico = Math.floor(Math.random() * 2658);

  var linha = [[copiedDate, null, null, 2658, 2658, 2658, -7974, -2658, -2658, -2658, null, estoqueRandomico]];
  button.disabled = true;
  google.visualization.events.addListener(chart, 'ready',
    function() {
      button.disabled = false;
    }
  );
  dataTable.insertRows(ultimaLinha, linha); 
  date_formatter.format(dataTable, 0);
  chart.draw(dataTable, options); 
}  