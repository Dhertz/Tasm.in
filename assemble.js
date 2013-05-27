
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

//T
var rect = make_rect(vmiddle - 13*grid_size,
                    hmiddle - grid_size,
                    5*grid_size, grid_size,
                    'MintCream');

name_layer.add(rect);

var rect1 = make_rect(vmiddle - 11*grid_size,
                    hmiddle,
                    grid_size,
                    4*grid_size,
                    'MintCream');
name_layer.add(rect1);


//a
var circle = make_circle(vmiddle - 7.5*grid_size,
                    hmiddle + 2.5*grid_size,
                    1.5*grid_size,
                    'MintCream');
name_layer.add(circle);

var rect2 = make_rect(vmiddle - 7*grid_size,
                    hmiddle + grid_size,
                    grid_size,
                    3*grid_size,
                    'MintCream');

name_layer.add(rect2);

//s
var wedge = make_wedge(vmiddle - 3.5*grid_size,
                    hmiddle + 2.25*grid_size,
                    1.25*grid_size,
                    180, 150,
                    'MintCream');
name_layer.add(wedge);

var wedge1 = make_wedge(vmiddle - 4.25*grid_size,
                    hmiddle + 2.75*grid_size,
                    1.25*grid_size,
                    180, -30,
                    'MintCream');
name_layer.add(wedge1);

//m
var rect3 = make_rect(vmiddle - 2*grid_size,
                    hmiddle + grid_size,
                    grid_size,
                    3*grid_size,
                    'MintCream');
name_layer.add(rect3);

var wedge2 = make_wedge(vmiddle,
                    hmiddle + 2*grid_size,
                    grid_size,
                    180, 180,
                    'MintCream');
name_layer.add(wedge2);

var rect4 = make_rect(vmiddle + 2*grid_size,
                    hmiddle + 2*grid_size,
                    grid_size,
                    2*grid_size,
                    'MintCream');
name_layer.add(rect4);

var rect5 = make_rect(vmiddle,
                    hmiddle + 2*grid_size,
                    grid_size,
                    2*grid_size,
                    'MintCream');
name_layer.add(rect5);

var wedge3 = make_wedge(vmiddle+2*grid_size,
                    hmiddle + 2*grid_size,
                    grid_size,
                    180, 180,
                    'MintCream');
name_layer.add(wedge3);

var rect6 = make_rect(vmiddle + 2*grid_size,
                    hmiddle + 2*grid_size,
                    grid_size,
                    2*grid_size,
                    'MintCream');
name_layer.add(rect6);

//i
var rect7 = make_rect(vmiddle + 4*grid_size,
                    hmiddle + grid_size,
                    grid_size,
                    3*grid_size,
                    'MintCream');
name_layer.add(rect7);

var circle = make_circle(vmiddle + 4.5*grid_size,
                    hmiddle - 0.5*grid_size,
                    grid_size/2,
                    'MintCream');
name_layer.add(circle);

//n
var rect8 = make_rect(vmiddle + 6*grid_size,
                    hmiddle + grid_size,
                    grid_size,
                    3*grid_size,
                    'MintCream');
name_layer.add(rect8);

var wedge2 = make_wedge(vmiddle + 8*grid_size,
                    hmiddle + 2*grid_size,
                    grid_size,
                    180, 180,
                    'MintCream');
name_layer.add(wedge2);

var rect9 = make_rect(vmiddle + 8*grid_size,
                    hmiddle + 2*grid_size,
                    grid_size,
                    grid_size*2,
                    'MintCream');
name_layer.add(rect9);

var text_boxes = new Array();
var width = vmiddle - grid_size;

for (var i = infos.length - 1; i >= 0; i--) {
     var box = make_text_box(infos[i].title);
     text_boxes[i] = new info(box, infos[i].text, name_layer);
     width -= (text_boxes[i].getWidth() + grid_size)/2; 
};
for (var i = 0; i < text_boxes.length; i++) {
     text_boxes[i].setX(width);
     width += (text_boxes[i].getWidth() + grid_size);
};

stage.add(grid_layer);
stage.add(animate_layer);
stage.add(name_layer);
stage.add(info_layer);

window.scrollTo(window.innerWidth/4,window.innerHeight/1.5);
var canvas = document.getElementById('container');
canvas.onselectstart = function () { return false; }
canvas.onmousedown = function () { return false; }

newLine(grid_size, ratio, mratio, animate_layer);
