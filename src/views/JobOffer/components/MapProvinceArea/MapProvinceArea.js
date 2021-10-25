import React, { useEffect, useState, useCallback } from 'react';
import {
  Grid, Card
} from '@material-ui/core';
import map_province_svg from 'assets/svg/map-provinces.svg';
import { withRouter } from 'react-router-dom';
import { ReactSVG } from 'react-svg'
import useStyles from './style';

const MapProvinceArea = (props) => {
  const { provinceList, selectedProvince, chartData, data, chart_title, bottom_title, list } = props;
  const classes = useStyles();
  const color_list = getColorList();
  const [margin, setMargin] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  function getColorList() {
    let list = [];
    let from_r = 214;
    let from_g = 50;
    let from_b = 75;
    let to_r = 0;
    let to_g = 0;
    let to_b = 128;

    for (let i = 0; i < 5; i++) {
      let r = from_r + (to_r - from_r) / 5 * i;
      let g = from_g + (to_g - from_g) / 5 * i;
      let b = from_b + (to_b - from_b) / 5 * i;
      list.push('rgb(' + r + ',' + g + ',' + b + ')');
    }
    return list;
  }

  function showTooltip(evt, text) {
    let tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = text;
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX - 30 + 'px';
    tooltip.style.top = evt.pageY - 30 + 'px';
  }

  function hideTooltip() {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
  }

  useEffect(() => {
    let min = 1000000;
    let max = -1000000;
    for (let i = 0; i < chartData.length; i++) {
      if (parseFloat(chartData[i].value) < min) {
        min = parseFloat(chartData[i].value);
      }
      if (parseFloat(chartData[i].value) > max) {
        max = parseFloat(chartData[i].value);
      }
    }
    setMin(min);
    setMax(max);
    if (chartData.length === 0)
      setMargin(0);
    else if (chartData.length === 1) {
      setMargin((max - 0) / 5);
      setMin(0);
    } else {
      setMargin((max - min) / 5);
    }
  }, [chartData]);
  return (
    <>
      <Grid item xs={12} className={classes.controlContainer}>
        <Card className={classes.controlBlock} ref={data}>
          <div className={classes.chart_title}>
            {chart_title}
          </div>
          <Grid container>
            <Grid item md={8} xs={12}>
              <div id="tooltip" className={classes.tooltip} display="none" />
              <ReactSVG
                afterInjection={(error, svg) => {
                  let list = [];
                  for (let i = 0; i < svg.children.length; i++) {
                    if (svg.children[i].tagName === 'path') {
                      let title = '';
                      for (let j = 0; j < provinceList.length; j++) {
                        if (provinceList[j].id === parseInt(svg.children[i].getAttribute('data-id'))) {
                          let value = 0;
                          for (let k = 0; k < chartData.length; k++) {
                            if (parseInt(chartData[k].code) === parseInt(provinceList[j].id)) {
                              value = chartData[k].value;
                            }
                          }
                          title = provinceList[j].name + ' : ' + value;
                        }
                      }
                      svg.children[i].onmousemove = (evt) => showTooltip(evt, title);
                      svg.children[i].onmouseout = hideTooltip;
                      for (let j = 0; j < selectedProvince.length; j++) {
                        if (parseInt(selectedProvince[j]) === parseInt(svg.children[i].getAttribute('data-id'))) {
                          let color = 0;
                          for (let k = 0; k < chartData.length; k++) {
                            if (parseInt(chartData[k].code) === parseInt(selectedProvince[j])) {
                              let color_ind = Math.ceil((parseFloat(chartData[k].value) - 0) / margin);
                              if (color_ind >= color_list.length) {
                                color_ind = color_list.length - 1;
                              }
                              color = color_list[color_ind];
                            }

                          }
                          svg.children[i].style.fill = color;
                        }
                      }
                    }
                  }
                }}
                beforeInjection={(svg) => {
                  svg.classList.add('province_map')
                }}
                src={map_province_svg} />

            </Grid>
            <Grid item md={4} xs={12} style={{ alignItems: "flex-end", justifyContent: "flex-end", display: "flex" }}>
              <div className={classes.overflowCotainer}>
                <div className={classes.layoutOverflow}>
                  {color_list.map((item, index) => (
                    <div className={classes.colorBlock}>
                      <div style={{ width: '20px', height: '10px', border: '1px solid gray', backgroundColor: color_list[index] }} />
                      <div style={{ marginLeft: '20px' }}>{((index) * margin + min).toFixed(2)} ~ {((index + 1) * margin + min).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Grid>
          </Grid>
          <div style={{marginTop: '30px'}}>
            <div className={classes.chart_title}>
              {bottom_title}
            </div>
            <div className={classes.chart_title}>
              {list.join('; ')}
            </div>
          </div>
        </Card>
      </Grid>
    </>
  );
};

export default withRouter(MapProvinceArea);
