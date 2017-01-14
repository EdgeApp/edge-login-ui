import React, {Component} from 'react'

class Content extends React.Component {
    render() {
        return (
            <section id="content_wrapper">
                <section id="content">
                   {this.props.children}
                </section>
            </section>
        )
    }
}

export default Content
