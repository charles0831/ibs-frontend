import React, { useEffect, useState, useRef } from 'react';
import domtoimage from 'dom-to-image';
import domtopdf from 'dom-to-pdf';
import jsPDF from "jspdf";
import {
  ClusterAdditionalOption,
  PkdSectionAdditionalOption,
  ProvinceAdditionalOption,
  MultiSelect,
  SingleSelect,
  OccupationAdditionalOption,
  PkdOccupationAdditionalOption,
  ProvinceOccupationAdditionalOption,
  ClusterOccupationAdditionalOption,
  EducationAdditionalOption,
  ControllerArea,
  ChartTableArea,
  MapProvinceArea,
  MapCountyArea,
  SortTable
} from '../components';
import { withRouter } from 'react-router-dom';
import useStyles from '../SimulationInfo/style';
import {
  Grid,
  Card,
  Button,
  CircularProgress,
  TextField,
  Tooltip
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useToasts } from 'react-toast-notifications'
import scenarios from '../../../apis/scenarios';
import analyzes from '../../../apis/analyze';
import { CSVLink } from "react-csv";
import EXCEL from 'js-export-xlsx';

const SimulationInfoEdit = (props) => {
  const classes = useStyles();
  const chart = useRef(null);
  const tooltip_list = [
    'Podstawowy scenariusz wykorzystujący bazowe wartości wszystkich zmiennych egzogenicznych (zob. Raport metodologiczny w zakładce Pomoc)',
    'Scenariusz zakładający tempo wzrostu ogólnej produktywności wyższe o 0,25 p.p. rocznie niż w scenariuszu bazowym, tempo wzrostu popytu zagranicznego wyższe o 0,1 p.p. oraz udział konsumpcji publicznej w PKB wyższy o 1 p.p.',
    'Scenariusz zakładający współczynnik dzietności (TFR) niższy niż w scenariuszu bazowym. Różnica wynosi od 0,15 (początek prognozy) do 0,30 (rok 2050).',
    'Scenariusz zakładający tempo wzrostu ogólnej produktywności wyższe o 0,25 p.p. rocznie niż w scenariuszu bazowym.',
    'Scenariusz zakładający tempo wzrostu ogólnej produktywności niższe o 0,25 p.p. rocznie niż w scenariuszu bazowym.',
    'Scenariusz zakładający dwukrotnie większy napływ imigrantów niż w scenariuszu bazowym.',
    'Scenariusz zakładający dwukrotnie mniejszy napływ imigrantów niż w scenariuszu bazowym.'
  ];
  const { addToast } = useToasts()
  const { history } = props;
  const [item, setItem] = useState(props.location.state.item);
  const [scenariosLabels, setScenariosLabels] = useState([]);
  const [progressStatus, setProgressStatus] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState([]);
  const [selectedChartType, setSelectedChartType] = useState(0);
  const [selectedSection, setSelectedSection] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedMapCategory, setSelectedMapCategory] = useState(0);
  const [selectedShowChartsMode, setSelectedShowChartsMode] = useState(0);
  const [selectedPkdSection, setSelectedPkdSection] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState([]);
  const [selectedOccupationSize, setSelectedOccupationSize] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2011);
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [selectedAge, setSelectedAge] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [selectedToYear, setSelectedToYear] = useState(2050);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [field_list, setFieldList] = useState([]);
  const [pkdSectionList, setPkdSelectionList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [occupationList, setOccupationList] = useState([]);
  const [chartTypeList, setChartTypeList] = useState([]);
  const [totalChartResultList, setTotalChartResultList] = useState([]);
  const [countyList, setCountyList] = useState([]);
  const [sectionMapList, setSectionMapList] = useState([]);
  const [chartResultList, setChartResultList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [occupationSizeList, setOccupationSizeList] = useState([]);
  const [clusterList, setClusterList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [ageList, setAgeList] = useState([]);

  const [idAnalyze, setIdAnalyze] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [scenario, setScenario] = useState({});
  const [sortOption, setSortOption] = useState({ sortBy: 0, sortOrder: "asc" });
  const [sortTotalOption, setSortTotalOption] = useState({ sortBy: 0, sortOrder: "asc" });
  const [totalTableData, setTotalTableData] = useState([]);
  const [totalFieldList, setTotalFieldList] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [renderStatus, setRenderStatus] = useState(false);
  const [first_render, setFirstRender] = useState(true);

  const [pkdAllIn, setPkdAllIn] = useState(false);
  const [provinceAllIn, setProvinceAllIn] = useState(false);
  const [clusterAllIn, setClusterAllIn] = useState(false);
  const [occupationAllIn, setOccupationAllIn] = useState(false);

  const handleChange = (props) => {
    history.push('/forecasting_module');
  }
  const requestSort = (pSortBy) => {
    var sortOrder = "asc";
    if (pSortBy === sortOption.sortBy) {
      sortOrder = (sortOption.sortOrder === "asc" ? "desc" : "asc");
    }
    setSortOption({ sortBy: pSortBy, sortOrder: sortOrder })
  }

  const requestTotalSort = (pSortBy) => {
    var sortOrder = "asc";
    if (pSortBy === sortTotalOption.sortBy) {
      sortOrder = (sortTotalOption.sortOrder === "asc" ? "desc" : "asc");
    }
    setSortTotalOption({ sortBy: pSortBy, sortOrder: sortOrder })
  }

  const handleOpen = () => {
    history.push('/analyzes');
  }

  const handleExport = (type) => {
    if (type === 0)
      document.getElementById('export').click();
    if (type === 1)
      handleExportAsXlsx();
    if (type === 2)
      handleExportAsPng();
    if (type === 3)
      handleExportAsJpg();
    if (type === 4)
      handleExportAsPdf();
  }

  const handleExportAsXlsx = () => {
    let export_data = [];
    totalTableData.map((table_each, index) => {
      let item = [];
      headers.map((each, index) => {
        item.push(table_each[each.label])
      })
      export_data.push(item);
    })
    EXCEL.outPut({
      header: headers.map((item, index) => item.label),
      data: export_data,
      name: 'download'
    })
  }

  const handleExportAsPng = () => {
    const dom = chart.current;
    domtoimage.toPng(dom)
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'download.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  const handleExportAsJpg = () => {
    const dom = chart.current;
    domtoimage.toJpeg(dom)
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'download.jpg';
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  const A4_PAPER_DIMENSIONS = {
    width: 210,
    height: 297,
  };

  const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;

  const imageDimensionsOnA4 = (dimensions) => {
    const isLandscapeImage = dimensions.width >= dimensions.height;

    // If the image is in landscape, the full width of A4 is used.
    if (isLandscapeImage) {
      return {
        width: A4_PAPER_DIMENSIONS.width,
        height:
          A4_PAPER_DIMENSIONS.width / (dimensions.width / dimensions.height),
      };
    }

    // If the image is in portrait and the full height of A4 would skew
    // the image ratio, we scale the image dimensions.
    const imageRatio = dimensions.width / dimensions.height;
    if (imageRatio > A4_PAPER_RATIO) {
      const imageScaleFactor =
        (A4_PAPER_RATIO * dimensions.height) / dimensions.width;

      const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;

      return {
        height: scaledImageHeight,
        width: scaledImageHeight * imageRatio,
      };
    }

    // The full height of A4 can be used without skewing the image ratio.
    return {
      width: A4_PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
      height: A4_PAPER_DIMENSIONS.height,
    };
  };

  const handleExportAsPdf = () => {

    const dom = chart.current;
    domtoimage.toJpeg(dom)
      .then(function (dataUrl) {
        let img = new Image();
        img.onload = function () {
          const doc = new jsPDF();
          // We let the images add all pages,
          // therefore the first default page can be removed.
          doc.deletePage(1);

          const imageDimensions = imageDimensionsOnA4({
            width: this.width,
            height: this.height,
          });

          doc.addPage();
          doc.addImage(
            this.src,
            'JPEG',
            // Images are vertically and horizontally centered on the page.
            (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
            (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
            imageDimensions.width,
            imageDimensions.height
          );
          var link = document.createElement('a');
          link.download = 'download.pdf';
          link.href = doc.output("bloburl");
          link.click();
        }
        img.src = dataUrl;

      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  useEffect(() => {
    setChartResultList(totalChartResultList);
    if (selectedChartType == 3) {
      setSelectedSection(0);
      setPkdAllIn(false);
      setProvinceAllIn(false);
      setClusterAllIn(false);
      setOccupationAllIn(false);
    }
    if (selectedChartType == 2) {
      let _arr = JSON.parse(JSON.stringify(totalChartResultList));
      setChartResultList([_arr[1]]);
      setSelectedShowChartsMode(2);
      setPkdAllIn(false);
      setProvinceAllIn(false);
      setClusterAllIn(false);
      setOccupationAllIn(false);
    }
  }, [selectedChartType]);

  useEffect(() => {
    if (pkdAllIn || provinceAllIn || clusterAllIn || occupationAllIn) {
      let _arr = JSON.parse(JSON.stringify(totalChartResultList));
      setChartResultList([_arr[1]]);
      setSelectedShowChartsMode(2);
    } else {
      setChartResultList(totalChartResultList);
    }
  }, [pkdAllIn, provinceAllIn, clusterAllIn, occupationAllIn]);


  useEffect(() => {
    if (parseInt(selectedSection) === 8) {
      setSelectedCategory([]);
      setSelectedYear(2013);
    }
    setPkdAllIn(false);
    setProvinceAllIn(false);
    setClusterAllIn(false);
    setOccupationAllIn(false);
  }, [selectedSection])

  const handleSave = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const checkRenderStatus = () => {
    return parseInt(selectedChartType) === 0
      || parseInt(selectedSection) === 0
      || (parseInt(selectedSection) === 1 && ((selectedPkdSection.length === 0 && !pkdAllIn) || parseInt(selectedShowChartsMode) === 0))
      || (parseInt(selectedSection) === 2 && ((selectedProvince.length === 0 && !provinceAllIn) || parseInt(selectedShowChartsMode) === 0))
      || (parseInt(selectedSection) === 3 && ((selectedCluster.length === 0 && !clusterAllIn) || parseInt(selectedShowChartsMode) === 0))
      || (parseInt(selectedSection) === 4 && ((selectedOccupation.length === 0 && !occupationAllIn) || parseInt(selectedShowChartsMode) === 0))
      || (parseInt(selectedSection) === 5 && ((selectedPkdSection.length === 0 && !pkdAllIn) || (selectedOccupation.length === 0 && !occupationAllIn) || parseInt(selectedShowChartsMode) === 0))
      || (parseInt(selectedSection) === 6 && ((selectedProvince.length === 0 && !provinceAllIn) || (selectedOccupation.length === 0 && !occupationAllIn) || parseInt(selectedShowChartsMode) === 0))
      || (parseInt(selectedSection) === 7 && ((selectedCluster.length === 0 && !clusterAllIn) || (selectedOccupation.length === 0 && !occupationAllIn) || parseInt(selectedShowChartsMode) === 0))
      || (parseInt(selectedSection) === 8 && (selectedEducation.length === 0 || selectedAge.length === 0 || parseInt(selectedShowChartsMode) === 0));
  }

  const handleSaveAnalyze = () => {
    setProgressStatus(true);
    analyzes.updateAnalyze(
      name,
      selectedChartType,
      selectedSection,
      parseInt(selectedChartType) === 3 ? selectedMapCategory : selectedCategory,
      selectedProvince,
      selectedOccupation,
      selectedPkdSection,
      selectedShowChartsMode,
      item.id_scenario,
      idAnalyze,
      selectedOccupationSize,
      selectedCluster,
      selectedEducation,
      selectedAge,
    )
      .then(response => {
        setProgressStatus(false);
        if (response.code === 401) {
          history.push('/login');
        } else {
          if (response.code === 200) {
            addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true });
            setTimeout(function () { history.push('/analyzes'); }, 1000);
          } else {
            addToast(response.message, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true });
          }

        }
      })
  }

  const convertChartData = (list) => {
    if (Number(selectedSection) <= 4) {
      let result = [{ data: [], name: 'Ogółem' }];

      for (let i = 0; i < list[0].data.length; i++) {
        let item_list = { 'Rok': 0, 'Popyt na pracę': 0, 'Podaż pracy': 0, 'Luka': 0, 'Zatrudnienie': 0 };
        for (let j = 0; j < list.length; j++) {
          let item = list[j].data[i];
          item_list['Rok'] = item['Rok'];
          item_list['Popyt na pracę'] += item['Popyt na pracę'];
          item_list['Podaż pracy'] += item['Podaż pracy'];
          item_list['Luka'] += item['Luka'];
          item_list['Zatrudnienie'] += item['Zatrudnienie'];
        }
        result[0].data.push(item_list);
      }
      return result;
    } else {
      if ((pkdAllIn || provinceAllIn || clusterAllIn) && occupationAllIn) {
        let result = [{ data: [], name: 'Ogółem' }];

        for (let i = 0; i < list[0].data.length; i++) {
          let item_list = { 'Rok': 0, 'Popyt na pracę': 0, 'Podaż pracy': 0, 'Luka': 0, 'Zatrudnienie': 0 };
          for (let j = 0; j < list.length; j++) {
            let item = list[j].data[i];
            item_list['Rok'] = item['Rok'];
            item_list['Popyt na pracę'] += item['Popyt na pracę'];
            item_list['Podaż pracy'] += item['Podaż pracy'];
            item_list['Luka'] += item['Luka'];
            item_list['Zatrudnienie'] += item['Zatrudnienie'];
          }
          result[0].data.push(item_list);
        }
        return result;
      } else if (pkdAllIn || provinceAllIn || clusterAllIn) {
        let result_list = [];
        let temp_list = [];
        for (let i = 0; i < selectedOccupation.length; i++) {
          let _temp_list = [];
          for (let j = 0; j < list.length; j++) {
            if (j % selectedOccupation.length === i) {
              _temp_list.push(list[j]);
            }
          }
          temp_list.push(_temp_list);
        }

        for (let i = 0; i < temp_list.length; i++) {
          let _temp_item = temp_list[i];
          let result = { data: [], name: `Ogółem (${_temp_item[0].sub_name})` };
          for (let j = 0; j < _temp_item[0].data.length; j++) {
            let item_list = { 'Rok': 0, 'Popyt na pracę': 0, 'Podaż pracy': 0, 'Luka': 0, 'Zatrudnienie': 0 };
            for (let k = 0; k < _temp_item.length; k++) {
              let item = _temp_item[k].data[j];
              item_list['Rok'] = item['Rok'];
              item_list['Popyt na pracę'] += item['Popyt na pracę'];
              item_list['Podaż pracy'] += item['Podaż pracy'];
              item_list['Luka'] += item['Luka'];
              item_list['Zatrudnienie'] += item['Zatrudnienie'];
            }
            result.data.push(item_list);
          }
          result_list.push(result);
        }
        return result_list;
      } else if (occupationAllIn) {

        let list_count = 0;
        if (Number(selectedSection) == 5)
          list_count = selectedPkdSection.length;
        else if (Number(selectedSection) == 6)
          list_count = selectedProvince.length;
        else if (Number(selectedSection) == 7)
          list_count = selectedCluster.length;
        let result_list = [];
        let temp_list = [];
        let k = 0;
        let count = 0;
        for (let j = 0; j < list.length; j++) {
          if (k === 0)
            temp_list.push([]);
          if (k < list.length / list_count) {
            temp_list[count].push(list[j]);
          }
          k++;
          if (k === selectedOccupation.length / list_count) {
            k = 0;
          }
        }

        console.log(temp_list);

        for (let i = 0; i < temp_list.length; i++) {
          let _temp_item = temp_list[i];
          let result = { data: [], name: `${_temp_item[0].name}(Ogółem)` };
          for (let j = 0; j < _temp_item[0].data.length; j++) {
            let item_list = { 'Rok': 0, 'Popyt na pracę': 0, 'Podaż pracy': 0, 'Luka': 0, 'Zatrudnienie': 0 };
            for (let k = 0; k < _temp_item.length; k++) {
              let item = _temp_item[k].data[j];
              item_list['Rok'] = item['Rok'];
              item_list['Popyt na pracę'] += item['Popyt na pracę'];
              item_list['Podaż pracy'] += item['Podaż pracy'];
              item_list['Luka'] += item['Luka'];
              item_list['Zatrudnienie'] += item['Zatrudnienie'];
            }
            result.data.push(item_list);
          }
          result_list.push(result);
        }
        console.log(result_list);
        return result_list;
      }
    }
  }


  const handleRender = () => {
    let category_count = 0;
    let chart_count = 0;

    if (Number(selectedChartType) === 3) {
      category_count = selectedMapCategory.length;
    } else {
      category_count = selectedCategory.length;
    }

    if (Number(selectedSection) == 1) {
      chart_count = selectedPkdSection.length;
    } else if (Number(selectedSection) == 2) {
      chart_count = selectedProvince.length;
    } else if (Number(selectedSection) == 3) {
      chart_count = selectedCluster.length;
    } else if (Number(selectedSection) == 4) {
      chart_count = selectedOccupation.length;
    } else if (Number(selectedSection) == 5) {
      chart_count = selectedPkdSection.length * selectedOccupation.length;
    } else if (Number(selectedSection) == 6) {
      chart_count = selectedProvince.length * selectedOccupation.length;
    } else if (Number(selectedSection) == 7) {
      chart_count = selectedCluster.length * selectedOccupation.length;
    } else if (Number(selectedSection) == 8) {
      chart_count = selectedEducation.length * selectedAge.length;
    }

    if (Number(selectedChartType) === 1 && chart_count * category_count > 10 && Number(selectedShowChartsMode) === 2) {
      addToast('Wykres liniowy prezentujący zbiorcze dane może zawierać do 10 linii. Zmień ustawienia i wygeneruj wykres ponownie',
        { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true });
    } else {
      setFirstRender(false);
      setTableData([]);
      setProgressStatus(true);
      let pkd_list = [];
      let province_list = [];
      let cluster_list = [];
      let occupation_list = [];
      if (pkdAllIn) {
        pkd_list = pkdSectionList.map((item, index) => {
          return item.id;
        })
      }
      if (provinceAllIn) {
        province_list = provinceList.map((item, index) => {
          return item.id;
        })
      }
      if (clusterAllIn) {
        cluster_list = clusterList.map((item, index) => {
          return item.id;
        })
      }
      if (occupationAllIn) {
        for (let i = 0; i < occupationList.length; i++) {
          if ((occupationList[i].id).length === selectedOccupationSize)
            occupation_list.push(occupationList[i].id)
        }
      }

      analyzes.getChartData(
        selectedChartType,
        selectedSection,
        parseInt(selectedChartType) === 3 ? selectedMapCategory : selectedCategory,
        item.id_scenario,
        selectedYear,
        selectedToYear,
        occupationAllIn ? occupation_list : selectedOccupation,
        pkdAllIn ? pkd_list : selectedPkdSection,
        provinceAllIn ? province_list : selectedProvince,
        clusterAllIn ? cluster_list : selectedCluster,
        selectedEducation,
        selectedEducation,
        selectedAge,
        selectedShowChartsMode
      ).then(response => {
        if (response.code === 401) {
          history.push('/login');
        } else {
          if (response.code === 200) {
            if ((pkdAllIn || provinceAllIn || clusterAllIn || occupationAllIn) && Number(selectedChartType) === 1)
              setChartData(convertChartData(response.data.chart_data));
            else
              setChartData(response.data.chart_data);
            setTableData(response.data.table_data);
            setFieldList(response.data.field_list);
          } else {
          }
        }
      })
      analyzes.getTotalData(
        selectedChartType,
        selectedSection,
        parseInt(selectedChartType) === 3 ? selectedMapCategory : selectedCategory,
        item.id_scenario,
        selectedYear,
        selectedToYear,
        occupationAllIn ? occupation_list : selectedOccupation,
        pkdAllIn ? pkd_list : selectedPkdSection,
        provinceAllIn ? province_list : selectedProvince,
        clusterAllIn ? cluster_list : selectedCluster,
        selectedEducation,
        selectedEducation,
        selectedAge,
        selectedShowChartsMode
      ).then(response => {
        if (response.code === 401) {
          history.push('/login');
        } else {
          if (response.code === 200) {
            setTotalTableData(response.data.table_data);
            setTotalFieldList(response.data.field_list);
            let _arr = [];
            for (let i = 0; i < response.data.field_list.length; i++) {
              let _item = {};
              _item.label = response.data.field_list[i].toString();
              _item.key = response.data.field_list[i].toString();
              _arr.push(_item);
            }
            setHeaders(_arr);
          } else {
          }
        }
        setProgressStatus(false);
        setRenderStatus(true);
        chart.current.scrollIntoView({ behavior: 'smooth' });
      })
    }
  }

  const renderResultView = () => {
    let chart_bottom_title = '';
    let list = [];
    let sub_list = [];
    if (parseInt(selectedSection) === 1) {
      chart_bottom_title = 'Na wykresie przedstawiono liczebności dla następujących sektorów:';
      selectedPkdSection.map((item, index) => {
        pkdSectionList.map((_item, _index) => {
          if (item == _item.id)
            list.push(_item.name);
        })
      })
    } else if (parseInt(selectedSection) === 2) {
      chart_bottom_title = 'Na wykresie przedstawiono liczebności dla następujących województw:';
      selectedProvince.map((item, index) => {
        provinceList.map((_item, _index) => {
          if (item == _item.id)
            list.push(_item.name);
        })
      })
    } else if (parseInt(selectedSection) === 3) {
      chart_bottom_title = 'Na wykresie przedstawiono liczebności dla następujących grup powiatów:';
      selectedCluster.map((item, index) => {
        clusterList.map((_item, _index) => {
          if (item == _item.id)
            list.push(_item.name);
        })
      })
    } else if (parseInt(selectedSection) === 4) {
      chart_bottom_title = 'Na wykresie przedstawiono liczebności dla następujących grup zawodowych:';
      selectedOccupation.map((item, index) => {
        occupationList.map((_item, _index) => {
          if (item == _item.id)
            list.push(_item.name);
        })
      })
    } else if (parseInt(selectedSection) === 5) {
      chart_bottom_title = 'Na wykresie przedstawiono liczebności dla następujących sektorów:';
      selectedPkdSection.map((item, index) => {
        pkdSectionList.map((_item, _index) => {
          if (item == _item.id)
            list.push(_item.name);
        })
      })
      selectedOccupation.map((item, index) => {
        occupationList.map((_item, _index) => {
          if (item == _item.id)
            sub_list.push(_item.name);
        })
      })
    } else if (parseInt(selectedSection) === 6) {
      chart_bottom_title = 'Na wykresie przedstawiono liczebności dla następujących województw:';
      selectedProvince.map((item, index) => {
        provinceList.map((_item, _index) => {
          if (item == _item.id)
            list.push(_item.name);
        })
      })

      selectedOccupation.map((item, index) => {
        occupationList.map((_item, _index) => {
          if (item == _item.id)
            sub_list.push(_item.name);
        })
      })
    } else if (parseInt(selectedSection) === 7) {
      chart_bottom_title = 'Na wykresie przedstawiono liczebności dla następujących grup powiatów:';
      selectedCluster.map((item, index) => {
        clusterList.map((_item, _index) => {
          if (item == _item.id)
            list.push(_item.name);
        })
      })

      selectedOccupation.map((item, index) => {
        occupationList.map((_item, _index) => {
          if (item == _item.id)
            sub_list.push(_item.name);
        })
      })
    } else if (parseInt(selectedSection) === 8) {
      chart_bottom_title = 'Na wykresie przedstawiono liczebności dla następujących grup wykształcenia:';
      selectedEducation.map((item, index) => {
        educationList.map((_item, _index) => {
          if (item == _item.id)
            list.push(_item.name);
        })
      })
    }
    if (parseInt(selectedChartType) === 3) {
      let chart_title = '';

      chart_title += categoryList[selectedMapCategory - 1].name.charAt(0).toUpperCase() + categoryList[selectedMapCategory - 1].name.slice(1) + ' - przekrój ';
      chart_title += sectionList[selectedSection - 1].name.toLowerCase();
      chart_title += ' (w tysiącach)';
      if (parseInt(selectedSection) === 6 || parseInt(selectedSection) === 2) {
        return <MapProvinceArea
          data={chart}
          provinceList={provinceList}
          selectedProvince={selectedProvince}
          selectedShowChartsMode={selectedShowChartsMode}
          chartData={chartData}
          chart_title={chart_title}
          bottom_title={chart_bottom_title}
          list={list}
          sub_list={sub_list}
        />
      } else {
        return <MapCountyArea
          data={chart}
          clusterList={clusterList}
          countyList={countyList}
          selectedCluster={selectedCluster}
          selectedShowChartsMode={selectedShowChartsMode}
          chartData={chartData}
          chart_title={chart_title}
          bottom_title={chart_bottom_title}
          list={list}
          sub_list={sub_list}
        />
      }
    } else {
      let chart_title = '';
      if (selectedCategory.length > 0) {
        for (let i = 0; i < selectedCategory.length - 1; i++) {
          chart_title += categoryList[selectedCategory[i] - 1].name.toLowerCase() + '/';
        }
        chart_title += categoryList[selectedCategory[selectedCategory.length - 1] - 1].name.toLowerCase() + ' - przekrój ';
        chart_title += sectionList[selectedSection - 1].name.toLowerCase();
      } else {
        chart_title = sectionList[selectedSection - 1].name.toLowerCase();
      }
      chart_title = chart_title.charAt(0).toUpperCase() + chart_title.slice(1);
      if (chart_title === 'Edukacja') {
        chart_title = 'Liczba absolwentów, tys.';
      }
      chart_title += ' (w tysiącach)';
      return <ChartTableArea
        data={chart}
        chartData={chartData}
        selectedChartType={selectedChartType}
        selectedCategory={selectedCategory}
        tableData={tableData}
        requestSort={requestSort}
        sortOption={sortOption}
        field_list={field_list}
        setTableData={setTableData}
        chart_title={chart_title}
        selectedSection={selectedSection}
        bottom_title={chart_bottom_title}
        list={list}
        sub_list={sub_list}
      />
    }
  }

  const renderTotalView = () => (
    <Grid item xs={12}>
      <Card className={classes.totalView}>
        <SortTable
          rows={totalTableData}
          requestSort={requestTotalSort}
          sortOrder={sortTotalOption.sortOrder}
          sortBy={sortTotalOption.sortBy}
          field_list={totalFieldList}
          handleChangeTableData={setTotalTableData}
        />
      </Card>
    </Grid>
  )

  const renderControlView = () => {
    if (checkRenderStatus()) {
      return <></>
    } else {
      if (first_render) {
        handleRender();
      }
      return (
        <Grid container spacing={2} className={classes.thirdContainer}>
          <ControllerArea
            setSelectedYear={setSelectedYear}
            selectedYear={selectedYear}
            setSelectedToYear={setSelectedToYear}
            selectedToYear={selectedToYear}
            handleExport={handleExport}
            handleSave={handleSave}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            setName={setName}
            handleSaveAnalyze={handleSaveAnalyze}
            name={name}
            yearList={yearList}
            selectedChartType={selectedChartType}
            handleRender={handleRender}
          />
          <CSVLink asyncOnClick={true} data={totalTableData} headers={headers} filename="generated.csv" style={{ display: 'none' }} id='export'>Export to CSV</CSVLink>
          {
            renderStatus ?
              <>
                <>
                  {renderResultView()}
                </>
                <>
                  {renderTotalView()}
                </>
              </>
              :
              <></>
          }
        </Grid>
      )
    }
  }
  const renderSwitchAddition = () => {
    if (parseInt(selectedChartType) === 0 || parseInt(selectedSection) === 0 || (parseInt(selectedChartType) !== 3 && parseInt(selectedSection) !== 8 && selectedCategory.length === 0) || (parseInt(selectedChartType) === 3 && parseInt(selectedMapCategory) === 0)) {
      return <></>;
    }
    switch (parseInt(selectedSection)) {
      case 1:
        return <PkdSectionAdditionalOption
          pkdSectionValue={selectedPkdSection}
          showChartModeValue={selectedShowChartsMode}
          handleSelectedPkdSection={setSelectedPkdSection}
          handleSelectedShowChartsMode={setSelectedShowChartsMode}
          pkdSectionList={pkdSectionList}
          showChartsMode={chartResultList}
          allIn={pkdAllIn}
          setAllIn={setPkdAllIn}
        />
      case 2:
        return <ProvinceAdditionalOption
          provinceValue={selectedProvince}
          showChartModeValue={selectedShowChartsMode}
          handleSelectedProvince={setSelectedProvince}
          handleSelectedShowChartsMode={setSelectedShowChartsMode}
          provinceList={provinceList}
          showChartsMode={chartResultList}
          allIn={provinceAllIn}
          setAllIn={setProvinceAllIn}
        />
      case 3:
        return <ClusterAdditionalOption
          clusterValue={selectedCluster}
          showChartModeValue={selectedShowChartsMode}
          handleSelectedCluster={setSelectedCluster}
          handleSelectedShowChartsMode={setSelectedShowChartsMode}
          clusterList={clusterList}
          showChartsMode={chartResultList}
          allIn={clusterAllIn}
          setAllIn={setClusterAllIn}
        />
      case 4:
        return <OccupationAdditionalOption
          occupationValue={selectedOccupation}
          showChartModeValue={selectedShowChartsMode}
          occupationSizeValue={selectedOccupationSize}
          handleSelectedOccupation={setSelectedOccupation}
          handleSelectedShowChartsMode={setSelectedShowChartsMode}
          handleSelectedOccupationSize={setSelectedOccupationSize}
          occupationList={occupationList}
          showChartsMode={chartResultList}
          occupationSizeList={occupationSizeList}
          allIn={occupationAllIn}
          setAllIn={setOccupationAllIn}
        />
      case 5:
        return <PkdOccupationAdditionalOption
          occupationValue={selectedOccupation}
          pkdSectionValue={selectedPkdSection}
          occupationSizeValue={selectedOccupationSize}
          showChartModeValue={selectedShowChartsMode}
          handleSelectedPkdSection={setSelectedPkdSection}
          handleSelectedOccupation={setSelectedOccupation}
          handleSelectedShowChartsMode={setSelectedShowChartsMode}
          handleSelectedOccupationSize={setSelectedOccupationSize}
          pkdSectionList={pkdSectionList}
          occupationList={occupationList}
          showChartsMode={chartResultList}
          occupationSizeList={occupationSizeList}
          occupationAllIn={occupationAllIn}
          setOccupationAllIn={setOccupationAllIn}
          pkdAllIn={pkdAllIn}
          setPkdAllIn={setPkdAllIn}
        />
      case 6:
        return <ProvinceOccupationAdditionalOption
          occupationValue={selectedOccupation}
          provinceValue={selectedProvince}
          occupationSizeValue={selectedOccupationSize}
          showChartModeValue={selectedShowChartsMode}
          handleSelectedProvince={setSelectedProvince}
          handleSelectedOccupation={setSelectedOccupation}
          handleSelectedShowChartsMode={setSelectedShowChartsMode}
          handleSelectedOccupationSize={setSelectedOccupationSize}
          provinceList={provinceList}
          occupationList={occupationList}
          showChartsMode={chartResultList}
          occupationSizeList={occupationSizeList}
          selectedChartType={selectedChartType}
          occupationAllIn={occupationAllIn}
          setOccupationAllIn={setOccupationAllIn}
          provinceAllIn={provinceAllIn}
          setProvinceAllIn={setProvinceAllIn}
        />
      case 7:
        return <ClusterOccupationAdditionalOption
          occupationValue={selectedOccupation}
          clusterValue={selectedCluster}
          occupationSizeValue={selectedOccupationSize}
          showChartModeValue={selectedShowChartsMode}
          handleSelectedCluster={setSelectedCluster}
          handleSelectedOccupation={setSelectedOccupation}
          handleSelectedOccupationSize={setSelectedOccupationSize}
          handleSelectedShowChartsMode={setSelectedShowChartsMode}
          clusterList={clusterList}
          occupationList={occupationList}
          occupationSizeList={occupationSizeList}
          showChartsMode={chartResultList}
          selectedChartType={selectedChartType}
          occupationAllIn={occupationAllIn}
          setOccupationAllIn={setOccupationAllIn}
          clusterAllIn={clusterAllIn}
          setClusterAllIn={setClusterAllIn}
        />
      case 8:
        return <EducationAdditionalOption
          educationValue={selectedEducation}
          ageValue={selectedAge}
          showChartModeValue={selectedShowChartsMode}
          handleSelectedEducation={setSelectedEducation}
          handleSelectedAge={setSelectedAge}
          handleSelectedShowChartsMode={setSelectedShowChartsMode}
          educationList={educationList}
          ageList={ageList}
          showChartsMode={chartResultList}
        />
    }
  }

  const getNumArray = (str) => {
    let arr = str ? str.split(',') : [];
    for (let i = 0; i < arr.length; i++) {
      arr[i] = parseInt(arr[i]);
    }
    return arr;
  }

  const getStringArray = (str) => {
    let arr = str ? str.split(',') : [];
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i];
    }
    return arr;
  }

  useEffect(() => {
    setProgressStatus(true);
    analyzes
      .get(item.id_analyze)
      .then(response => {
        setProgressStatus(false);
        if (response.code === 401) {
          history.push('/login');
        } else {
          setSelectedOccupationSize(response.data.analyze.id_occupation_size);
          setClusterList(response.data.clusters);
          setPkdSelectionList(response.data.pkdSections);
          setProvinceList(response.data.provinces);
          setOccupationList(response.data.professions);
          setChartTypeList(response.data.chart_type);
          setSectionList(response.data.sections);
          setCategoryList(response.data.categories);
          setChartResultList(response.data.chart_result);
          setTotalChartResultList(response.data.chart_result);
          setOccupationSizeList(response.data.profession_sizes);
          setCountyList(response.data.counties);
          setEducationList(response.data.educations);
          setAgeList(response.data.ages);
          setItem(response.data.scenario);
          setName(response.data.analyze.name);
          setIdAnalyze(response.data.analyze.id_analyze);
          setSelectedCluster(getNumArray(response.data.analyze.id_cluster));
          setSelectedChartType(response.data.analyze.id_chart_type);
          setSelectedSection(response.data.analyze.id_section);
          if (parseInt(response.data.analyze.id_chart_type) === 3) {
            setSelectedMapCategory(response.data.analyze.id_category)
          } else {
            setSelectedCategory(getNumArray(response.data.analyze.id_category));
          }
          setSelectedPkdSection(getNumArray(response.data.analyze.id_pkd));
          setSelectedProvince(getNumArray(response.data.analyze.id_province));
          setSelectedOccupation(getNumArray(response.data.analyze.id_occupation));
          setSelectedShowChartsMode(response.data.analyze.id_chart_result);
          setSelectedEducation(getStringArray(response.data.analyze.id_education));
          setSelectedAge(getStringArray(response.data.analyze.id_age));
          let sections = [];
          response.data.sections.map((item, index) => {
            if (index == 1 || index == 2 || index == 5 || index == 6) {
              sections.push(item);
            }
          })
          setSectionMapList(sections);
        }
      })
  }, []);

  useEffect(() => {
    setTotalTableData([]);
    setTotalFieldList([]);
    setChartData([]);
    setRenderStatus(false);
  }, [selectedSection, selectedCategory, selectedOccupation, selectedPkdSection, selectedProvince, selectedCluster, selectedShowChartsMode, selectedYear, selectedToYear, selectedChartType, selectedMapCategory, selectedEducation, selectedAge]);

  useEffect(() => {
    let containsOld = false;
    let containsNew = false;
    let year;
    let toYear;
    for (let i = 0; i < selectedCategory.length; i++) {
      if (parseInt(selectedCategory[i]) !== 3) {
        containsNew = true;
      } else {
        containsOld = true;
      }
    }
    if (containsNew && containsOld) {
      year = 2011;
      toYear = 2050;
    } else if (containsNew) {
      year = 2019;
      toYear = 2050;
    } else if (containsOld) {
      year = 2011;
      toYear = 2020;
    } else {
      if (parseInt(selectedMapCategory) != 3) {
        year = 2019;
        toYear = 2050;
      } else {
        year = 2011;
        toYear = 2020;
      }
    }
    setSelectedYear(year);
    setSelectedToYear(toYear);
    let _arr = [];
    for (let i = year; i <= toYear; i++) {
      _arr.push(i);
    }
    setYearList(_arr);
  }, [selectedCategory, selectedMapCategory])

  const handleChangeChartType = (change) => {
    setChartData([]);
    setTableData([]);
    setSelectedChartType(change);
  }

  useEffect(() => {
    setProgressStatus(true);
    scenarios
      .getScenariosLabels()
      .then(response => {
        setProgressStatus(false);
        if (response.code === 401) {
          history.push('/login');
        } else {
          setScenariosLabels(response.data.scenarios_labels);
        }
      })
  }, []);

  return (
    <>
      <Card>
        <Grid container spacing={2} className={classes.mainContainer}>
          <Grid item md={5} sm={12} xs={12}>
            <div className={classes.titleBlock}>
              <div className={classes.titleHeader}>
                Wybrana symulacja:
              </div>
              <div className={classes.titleInfo}>
                <Autocomplete
                  className={classes.name_select_box}
                  value={item}
                  onChange={(event, value) => setItem(value ? value : {})}
                  options={scenariosLabels}
                  getOptionLabel={(option) => scenariosLabels && option && option.description}
                  renderInput={(params) => <TextField {...params} placeholder="Wpisz nazwę" variant="outlined" InputLabelProps={{ shrink: false }}
                    noOptionsText={'Brak opcji'}
                  />}
                  renderOption={(option, { selected }) => (
                    <Tooltip arrow title={option.id_scenario <= tooltip_list.length ? tooltip_list[option.id_scenario - 1] : ''} placement="right-start" value={option.id_scenario}>
                      <div className={classes.tooltip}>{option.description}</div>
                    </Tooltip>
                  )}
                />
              </div>
            </div>
          </Grid>
          <Grid item md={2} sm={6} xs={12}>
            <Button variant="contained" color="secondary" className={classes.btnChange} onClick={handleChange}>
              Resetuj
            </Button>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <Button variant="contained" color="secondary" className={classes.btnOpen} onClick={handleOpen}>
              Otwórz zapisaną analizę
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Card className={classes.secondContainer}>
        <Grid container spacing={2} className={classes.mainContainer}>
          <Grid item xs={12}>
            <div className={classes.mainHeader}>
              Przeglądaj wyniki
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <div className={classes.titleHeader}>
              Wybierz typ wykresu
            </div>
            <div className={classes.subHeader}>
              (można wybrać tylko 1 z typów jednocześnie)
            </div>
            <SingleSelect value={selectedChartType} handleChange={handleChangeChartType} list={chartTypeList} />
          </Grid>
          <Grid item md={4} xs={12}>
            <div className={classes.titleHeader}>
              Wybierz przekrój
            </div>
            <div className={classes.subHeader}>
              (można wybrać tylko 1 z typów jednocześnie)
            </div>
            <SingleSelect value={selectedSection} handleChange={setSelectedSection} list={parseInt(selectedChartType) != 3 ? sectionList : sectionMapList} />
          </Grid>
          <Grid item md={4} xs={12}>
            {
              parseInt(selectedSection) === 8
                ?
                <></>
                :
                <>
                  <div className={classes.titleHeader} style={selectedChartType == 3 ? { marginBottom: '40px' } : {}}>
                    Wybierz kategorię
                </div>
                  {
                    parseInt(selectedChartType) != 3 ?
                      <div className={classes.subHeader}>
                        (można wybrać 1, 2 lub 3 kategorie)
                  </div>
                      :
                      <></>
                  }
                  {
                    selectedChartType == 3
                      ?
                      <SingleSelect value={selectedMapCategory} handleChange={setSelectedMapCategory} list={categoryList} />
                      :
                      <MultiSelect value={selectedCategory} handleChange={setSelectedCategory} list={categoryList} />
                  }
                </>
            }
          </Grid>
        </Grid>
      </Card>
      {renderSwitchAddition()}
      {renderControlView()}
      {
        progressStatus ?
          <>
            <div className={classes.progressContainer}>
              <CircularProgress className={classes.progress} />
            </div>
          </>
          :
          <></>
      }
    </>
  );
};

export default withRouter(SimulationInfoEdit);
