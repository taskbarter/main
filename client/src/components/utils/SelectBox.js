import React from 'react';

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  clickHandler = e => {
    let obj = {
      title: this.props.title,
      slug: this.props.slug
    };
    let wasSelected = this.state.isSelected;
    if (this.props.isSelectable || wasSelected) {
      if (wasSelected) {
        this.props.deselected(obj);
      } else {
        this.props.selected(obj);
      }
      this.setState({
        isSelected: !this.state.isSelected
      });
    }
  };

  render() {
    return (
      <div
        className={
          this.state.isSelected ? 'main-container active-box' : 'main-container'
        }
      >
        <a href='#' className='clickable-container' onClick={this.clickHandler}>
          <span
            style={
              this.state.isSelected
                ? { background: '#05AC72' }
                : !this.props.isSelectable
                ? { color: '#ffffff78', borderColor: '#ffffff78' }
                : {}
            }
            className='select-icon'
          >
            <i className='fas fa-check' />
          </span>
          <div>
            <img className='box-img' src={this.props.image} />
          </div>
          <div className='box-title'>{this.props.title}</div>
        </a>
      </div>
    );
  }
}
