import React from 'react';

class SelectBoxes extends React.Component {
  constructor() {
    super();
    this.state = {
      totalSelected: 0,
      arr: [],
      totalAllowed: 3
    };
  }

  selected = obj => {
    this.setState({ totalSelected: this.state.totalSelected + 1 });
    this.state.arr.push(obj);
    console.log(this.state.arr);
  };

  deselected = obj => {
    this.setState({ totalSelected: this.state.totalSelected - 1 });
    for (let i = 0; i < this.state.arr.length; i++) {
      if (this.state.arr[i].slug === obj.slug) {
        this.state.arr.splice(i, 1);
        break;
      }
    }
  };

  render() {
    return (
      <div className='boxes-container'>
        <SelectBox
          slug='programming'
          image='https://i.imgur.com/DD30lKQb.jpg'
          title='Programming'
          selected={this.selected}
          deselected={this.deselected}
          isSelectable={this.state.totalSelected < this.state.totalAllowed}
        />
        <SelectBox
          slug='writing'
          image='https://i.imgur.com/5qoevLmb.jpg'
          title='Writing'
          selected={this.selected}
          deselected={this.deselected}
          isSelectable={this.state.totalSelected < this.state.totalAllowed}
        />
        <SelectBox
          slug='designing'
          image='https://i.imgur.com/hHERtfCb.jpg'
          title='Designing'
          selected={this.selected}
          deselected={this.deselected}
          isSelectable={this.state.totalSelected < this.state.totalAllowed}
        />
        <SelectBox
          slug='proofreading'
          image='https://i.imgur.com/xCZ9tmpb.jpg'
          title='Proofreading'
          selected={this.selected}
          deselected={this.deselected}
          isSelectable={this.state.totalSelected < this.state.totalAllowed}
        />
        <SelectBox
          slug='videography'
          image='https://i.imgur.com/Hqmn61Hb.jpg'
          title='Videography'
          selected={this.selected}
          deselected={this.deselected}
          isSelectable={this.state.totalSelected < this.state.totalAllowed}
        />
        <SelectBox
          slug='marketing'
          image='https://i.imgur.com/IYh07BTb.jpg'
          title='Marketing'
          selected={this.selected}
          deselected={this.deselected}
          isSelectable={this.state.totalSelected < this.state.totalAllowed}
        />
        <SelectBox
          slug='translation'
          image='https://i.imgur.com/FmtaTtrb.jpg'
          title='Translation'
          selected={this.selected}
          deselected={this.deselected}
          isSelectable={this.state.totalSelected < this.state.totalAllowed}
        />
        <SelectBox
          slug='gaming'
          image='https://i.imgur.com/83smU7Bb.jpg'
          title='Gaming'
          selected={this.selected}
          deselected={this.deselected}
          isSelectable={this.state.totalSelected < this.state.totalAllowed}
        />
        <SelectBox
          slug='uidesign'
          image='https://i.imgur.com/bcUU6CZb.jpg'
          title='UI/UX Design'
          selected={this.selected}
          deselected={this.deselected}
          isSelectable={this.state.totalSelected < this.state.totalAllowed}
        />
        <SelectBox
          slug='voiceartist'
          image='https://i.imgur.com/Y5lPxLzb.jpg'
          title='Voice Artist'
          selected={this.selected}
          deselected={this.deselected}
          isSelectable={this.state.totalSelected < this.state.totalAllowed}
        />

        <span style={{ width: '100%', textAlign: 'center', marginTop: '20%' }}>
          Selected: <strong>{this.state.totalSelected}</strong>
          <br />
          Allowed: <strong>{this.state.totalAllowed}</strong>
          <br />
          Options:{' '}
          {this.state.arr.map((box, index) => {
            return box.title + ', ';
          })}
        </span>
      </div>
    );
  }
}
