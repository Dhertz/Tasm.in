var grid_size = 45;

var stage = new Kinetic.Stage({
container: 'container',
width: Math.max(window.innerWidth, 25*grid_size),
height: Math.max(window.innerHeight, 20*grid_size)
});

var grid_layer = new Kinetic.Layer({
width: stage.getWidth(),
height: stage.getHeight()
});

var animate_layer = new Kinetic.Layer({
width: stage.getWidth(),
height: stage.getHeight()
});

var name_layer = new Kinetic.Layer({
width: stage.getWidth(),
height: stage.getHeight()
});

var info_layer = new Kinetic.Layer( {
width: 10*grid_size,
height: 6*grid_size
});

var bk_grid = make_grid(grid_size, 2, grid_layer.getWidth(), grid_layer.getHeight(), 'MintCream', 'MintCream', 2);
grid_layer.add(bk_grid);

var mratio = minmax_ratio(animate_layer.getHeight(), animate_layer.getWidth());
var ratio = animate_layer.getWidth()/animate_layer.getHeight();

var vmiddle = grid_size*Math.round((name_layer.getWidth()/2)/grid_size)+grid_size;
var hmiddle = grid_size*Math.round((name_layer.getHeight()/2)/grid_size) - 2*grid_size;

WebFont.load({
     google: {
      families: ['Open Sans:300']
     },
     fontactive: function(familyName, fvd) {
          make_name();
          make_infos();

          stage.add(grid_layer);
          stage.add(animate_layer);
          stage.add(name_layer);
          stage.add(info_layer);

          window.scrollTo(window.innerWidth/4,window.innerHeight/1.5);
          var canvas = document.getElementById('container');
          canvas.onselectstart = function () { return false; }
          canvas.onmousedown = function () { return false; }

          newLine(grid_size, ratio, mratio, animate_layer);

     }
});

