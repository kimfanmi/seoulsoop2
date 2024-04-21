let arrow = document.getElementsByClassName("js_a_gungseo");
for (let div in arrow) {
  if (arrow.hasOwnProperty(div)) {
    let borderColor;
    let arrowBoldWight;
    let arrowBackgroundColor;
    arrow[div].classList.forEach(p => {
      if (p != "js_a_gungseo" && p != "left" && p != "right") {
        p.split("_").forEach((q, i) => {
          switch (i) {
            case 0:
              arrow[div].style.width = q + 'px';
              break;
            case 1:
              borderColor = q;
              break;
            case 2:
              arrowBoldWight = q;
              break;
            case 3:
              arrowBackgroundColor = q;
              break;
            default:
              break;
          }
        });
      }
      if (p == 'left') {
        arrow[div].style.transform = 'rotate(180deg)';
      }
    });

    let x = (2 / Math.SQRT2) * (arrow[div].offsetWidth - (parseInt(arrowBoldWight)) * Math.SQRT2);
    let y = Math.SQRT2 * x / 4 + arrow[div].offsetWidth / 2;
    arrow[div].style.height = 2 * y + 'px';


    let inDiv = document.createElement('div');
    let inDivinDiv1 = document.createElement('div');
    let inDivinDiv2 = document.createElement('div');
    let inDivinDiv3 = document.createElement('div');
    arrow[div].appendChild(inDiv);
    inDiv.appendChild(inDivinDiv1);
    inDiv.appendChild(inDivinDiv2);
    inDiv.appendChild(inDivinDiv3);

    inDiv.style.position = 'absolute';
    inDiv.style.top = arrow[div].offsetWidth - y + Math.SQRT2 * x / 2 - x / 2 - parseInt(arrowBoldWight) / 2 + 'px';
    inDiv.style.left = -(x + parseInt(arrowBoldWight)) / 2 + (arrow[div].offsetWidth - y) + 'px';
    inDiv.style.transform = 'rotate(-45deg)';

    x = Math.floor(x);
    y = Math.floor(y);


    inDiv.style.width = inDiv.style.height = x + parseInt(arrowBoldWight) + 'px';


    inDivinDiv1.style.width = '100%';
    inDivinDiv1.style.height = arrowBoldWight;
    inDivinDiv1.style.position = 'absolute';
    inDivinDiv1.style.bottom = 0;
    inDivinDiv1.style.borderBottom = '1px solid ' + borderColor;
    inDivinDiv1.style.borderLeft = '1px solid ' + borderColor;
    inDivinDiv1.style.borderRight = '1px solid ' + borderColor;
    inDivinDiv1.style.backgroundColor = arrowBackgroundColor;


    inDivinDiv2.style.width = arrowBoldWight;
    inDivinDiv2.style.height = x + 1 + 'px';
    inDivinDiv2.style.position = 'absolute';
    inDivinDiv2.style.right = 0;
    inDivinDiv2.style.borderTop = '1px solid ' + borderColor;
    inDivinDiv2.style.borderLeft = '1px solid ' + borderColor;
    inDivinDiv2.style.borderRight = '1px solid ' + borderColor;
    inDivinDiv2.style.backgroundColor = arrowBackgroundColor;

    inDivinDiv3.style.width = x + 'px';
    inDivinDiv3.style.height = arrowBoldWight;
    inDivinDiv3.style.position = 'absolute';
    inDivinDiv3.style.bottom = 0;
    inDivinDiv3.style.borderTop = '1px solid ' + borderColor;


    if (!getComputedStyle(arrow[div]).position) arrow[div].style.position = 'relative';
    arrow[div].style.overflow = 'hidden';
  }
}