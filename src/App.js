import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import JqxGrid, {
  IGridProps,
  jqx,
} from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxTooltip from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtooltip';
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.counter = 1;
    const source = {
      datafields: [
        {
          name: 'ShippedDate',
          map: 'm\\:properties>d\\:ShippedDate',
          type: 'date',
        },
        { name: 'Freight', map: 'm\\:properties>d\\:Freight', type: 'float' },
        {
          name: 'ShipName',
          map: 'm\\:properties>d\\:ShipName',
          type: 'string',
        },
        {
          name: 'ShipAddress',
          map: 'm\\:properties>d\\:ShipAddress',
          type: 'string',
        },
        {
          name: 'ShipCity',
          map: 'm\\:properties>d\\:ShipCity',
          type: 'string',
        },
        {
          name: 'ShipCountry',
          map: 'm\\:properties>d\\:ShipCountry',
          type: 'string',
        },
      ],
      datatype: 'xml',
      id: 'm\\:properties>d\\:OrderID',
      record: 'content',
      root: 'entry',
      sortcolumn: 'ShipName',
      sortdirection: 'asc',
      url: './../sampledata/orders.xml',
    };
    const tooltiprenderer = (element) => {
      const id = `toolTipContainer${this.counter}`;
      element[0].id = id;
      const content = element[0].innerText;
      setTimeout(() => {
        ReactDOM.render(
          <JqxTooltip position={'mouse'} content={content}>
            {content}
          </JqxTooltip>,
          document.getElementById(id)
        );
      });
      this.counter++;
    };
    this.state = {
      columns: [
        {
          text: 'Ship Name',
          datafield: 'ShipName',
          width: '5%',
          rendered: tooltiprenderer,
        },
        {
          text: 'Shipped Date',
          datafield: 'ShippedDate',
          width: '5%',
          cellsformat: 'yyyy-MM-dd',
          rendered: tooltiprenderer,
        },
        {
          text: 'Freight',
          datafield: 'Freight',
          width: '8%',
          cellsformat: 'f2',
          cellsalign: 'right',
          rendered: tooltiprenderer,
        },
        {
          text: 'Ship Address',
          datafield: 'ShipAddress',
          width: '5%',
          rendered: tooltiprenderer,
        },
        {
          text: 'Ship City',
          datafield: 'ShipCity',
          width: '5%',
          rendered: tooltiprenderer,
        },
        {
          text: 'Ship Country',
          datafield: 'ShipCountry',
          width: '5%',
          rendered: tooltiprenderer,
        },
      ],
      source: new jqx.dataAdapter(source),
    };
  }
  render() {
    return (
      <JqxGrid
        width={1024}
        height={450}
        source={this.state.source}
        columns={this.state.columns}
        altrows={true}
        sortable={true}
      />
    );
  }
}
export default App;
