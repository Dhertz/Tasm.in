function make_grid(distance, thickness, width, height, colour1, colour2, mod) {
        var linesY = new Array();
        var linesX = new Array();
        var group = new Kinetic.Group();

        var max = Math.max(width, height);
        for (var i = 0; i < width/distance; i ++) {
            if (i % mod) {
              linesY[i] = make_line([(i*distance), 0, (i*distance), height],
                                    colour1, thickness, 0.1, 1);
            } else {
              linesY[i] = make_line([(i*distance), 0, (i*distance), height],
                                    colour2, thickness, 0.2, 1);
            };
            group.add(linesY[i]);
        };


        for (var i = 0; i < height/distance; i ++) {
            if (i % mod) {
              linesX[i] = make_line([0, (i*distance), width, (i*distance)],
                                    colour1, thickness, 0.1, 1);
            } else {
              linesX[i] = make_line([0, (i*distance), width, (i*distance)],
                                    colour2, thickness, 0.2, 1);
            };
            group.add(linesX[i]);
        };
        return group;
}

function make_line (points, colour, width, opacity, blur) {
    return new Kinetic.Line({
                points: points,
                stroke: colour,
                strokeWidth: width,
                lineCap: 'square',
                lineJoin: 'square',
                opacity: opacity,
                shadowColor: colour,
                shadowBlur: blur,
                shadowOffset: 0,
                shadowOpacity: 1
    });
}

function make_rect(xc, yc, w, h, colour) {
    return new Kinetic.Rect({
                x: xc,
                y: yc,
                width: w,
                height: h,
                stroke: colour,
                strokeWidth: 4,
                opacity:0.8
    });

}

function make_circle(xc, yc, r, colour) {
    return new Kinetic.Circle({
                x: xc,
                y: yc,
                radius: r,
                stroke: colour,
                strokeWidth: 4,
                opacity:0.8
    });
}

function make_wedge (xc, yc, r, a, rd, colour) {
    return new Kinetic.Wedge({
                x: xc,
                y: yc,
                radius: r,
                angleDeg: a,
                rotationDeg: rd,
                stroke: colour,
                strokeWidth: 4,
                opacity:0.8
      });
}

function fade_out (object) {
    var tween = new Kinetic.Tween({
            node: object,
            duration: 1,
            opacity: 0
    });
    tween.play();
}

function gen_rand(max, grid_size) {
    return Math.floor(
              Math.random()*(
                Math.min(max/(grid_size*2))));
}

function minmax_ratio (x, y) {
    if (x < y) {
        return x/y;
    } else {
        return y/x;
    }
}

function newLine(grid_size, ratio, mratio, animate_layer) {
    var line;
    if(Math.random() <= mratio) {
        var ran = gen_rand(animate_layer.getWidth(), grid_size);
        var x = ran*grid_size*2;
        line = make_line([0,x,animate_layer.getWidth(),x], 'MintCream', 2, 0.3, 3);
        line.setX(-animate_layer.getWidth());
        animate_layer.add(line);
        var tween = new Kinetic.Tween({
            node: line,
            duration: 10,
            x: 0,
            onFinish: function() {fade_out(line);}
        });
        tween.play();
    } else {
        var ran = gen_rand(animate_layer.getHeight(), grid_size);
        var x = Math.floor(ran * ratio) * (grid_size*2);
        line = make_line([x,0,x,animate_layer.getHeight()], 'MintCream', 2, 0.2, 3);
        line.setY(-animate_layer.getHeight());
        animate_layer.add(line);
        var tween = new Kinetic.Tween({
            node: line,
            duration: 10,
            y:0,
            onFinish: function() {fade_out(line);}
        });
        tween.play();
    };
    animate_layer.draw();
    setTimeout(function() {
        newLine(grid_size, ratio, mratio, animate_layer);
        }, Math.random()*7000);
}

function make_text_box(text) {
    return new Kinetic.Text({
        x: 0,
        y: hmiddle + 5*grid_size,
        text: text,
        align: 'center',
        fontSize: grid_size,
        fontFamily: fonts,
        strokeWidth: 1.5,
        stroke: 'MintCream',
        fill: 'MintCream'
    });
}

function info(text_box, text, layer) {
    layer.add(text_box);
    text_box.on('mousedown touchstart', function() {
        make_info(text_box, text);
        console.log(text_box.getText());
     });
    text_box.on('mouseenter', function() {document.body.style.cursor = "pointer";});
    text_box.on('mouseleave', function() {document.body.style.cursor = "";});
    return text_box;
};

function make_info (box, text) {
    x = box.getX() + box.getWidth()/2;
    y = box.getY() + 2*grid_size;
    if(undefined === info_layer.get(".init")[0]) {
      info_layer.setX(x - info_layer.getWidth()/2);
      info_layer.setY(animate_layer.getHeight() + 10);
      var tween = new Kinetic.Tween({
        node: info_layer,
        y: y - info_layer.getHeight(),
        duration: 0.7,
        easing: Kinetic.Easings.EaseInOut
      });
      tween.play();
      var tween1 = new Kinetic.Tween({
        node: name_layer,
        y: -info_layer.getHeight(),
        duration: 0.7,
        easing: Kinetic.Easings.EaseInOut
      });
      tween1.play();

      var text_box = new Kinetic.Text({
            x: 0,
            y: 8,
            text: text,
            fontSize: 20,
            fontFamily: fonts,
            fill: '#555',
            width: grid_size * 10,
            height: grid_size * 7,
            padding: 20,
            align: 'center',
            name: 'text_box'
      });

      var r = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: info_layer.getWidth(),
            height: text_box.getHeight() + 16,
            fill: 'Linen',
            opacity: 1,
            name: "init"
      });
      info_layer.add(r);
      info_layer.add(text_box);

      var info_grid = make_grid(grid_size/3, 0.5, info_layer.getWidth(), text_box.getHeight() + 16, 'DodgerBlue', 'DodgerBlue', 5);
      info_layer.add(info_grid);
    } else {
      var tween1 = new Kinetic.Tween({
        node: info_layer,
        x: x - info_layer.getWidth()/2,
        duration: 0.7,
        easing: Kinetic.Easings.EaseInOut
      });
      tween1.play();

      curText = info_layer.get('.text_box')[0];
      if (curText.getText() != text) {
        var tween2 = new Kinetic.Tween({
            node: curText,
            duration: 0.35,
            opacity: 0,
            onFinish: function() { 
                curText.setText(text);
                var tween3 = new Kinetic.Tween({
                        node: curText,
                        duration: 0.35,
                        opacity: 1
                });
                tween3.play();
              }
        });
        tween2.play();
      };
    };
    info_layer.draw();
}