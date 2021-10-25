import React, { Component } from 'react';

const SiteInfoContext = React.createContext(null);
const SiteInfoContextConsumer = SiteInfoContext.Consumer;

class SiteInfoContextProvider extends Component{
	state = {
		is_contrast: false,
	};

	toggleContrast = () => {
		this.setState({is_contrast: !this.state.is_contrast});
	};


	render(){

		const { children } = this.props;

		return(
			<SiteInfoContext.Provider value={{
				is_contrast: this.state.is_contrast,
				toggleContrast: this.toggleContrast	
			}} >
				{ children }
			</SiteInfoContext.Provider>
		)
	}
};


export default SiteInfoContext;
export { SiteInfoContextProvider, SiteInfoContextConsumer };