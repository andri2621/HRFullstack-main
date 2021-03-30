import React, { Component } from 'react'
import NavigationBar from '../components/navbars/NavigationBar';
import Sidebar from '../components/sidebar/Sidebar';
import Footer from '../components/footers/Footer';

export default class MainLayout extends Component {
  render() {
    return (
      <div className="container mx-auto box-border md:box-content">

        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          <div class="h-7v bg-gray-800 col-start-1 col-end-7">
            <NavigationBar />
          </div>
          <div class="h-80v bg-gray-100 col-span-6 grid grid-cols-6 gap-1">
            <div class="bg-white col-span-1">
              <Sidebar />
            </div>
            <div class="bg-gray-100 col-start-2 col-span-5">
              {this.props.children}
            </div>
          </div>

          {/* <div class="h-5v col-span-6">
            <Footer />
          </div> */}
        </div>

      </div>
    )
  }
}