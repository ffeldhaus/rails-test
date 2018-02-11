# Setup

## Preparation

1. [Install rbenv](https://github.com/rbenv/rbenv#installation)
2. [Install rbenv-gemset plugin](https://github.com/jf/rbenv-gemset#github)
3. Install latest ruby with `rbenv install $(rbenv install -l | grep -v - | tail -1) -v`
4. Tell rbenv to use the latest ruby for the current shell session `rbenv shell $(rbenv install -l | grep -v - | tail -1)`
5. Install rails gem with `gem install rails`

## Rails setup

1. Create a new rails application which uses webpack to manage JS assets and the postgresql database `rails new rails-test --webpack=angular --database postgresql`
2. Change to application folder `cd rails-test`
3. Create .ruby-version file with `rbenv local $(rbenv install -l | grep -v - | tail -1)`


## Application Setup

1. Generate Rails Controller for Angular Frontend `rails g controller frontend index`
2. Make hello-angular app available by adding the following to the frontend view `app/views/frontend/index.html.erb`

    ```html
    <div>
    <hello-angular></hello-angular>
    </div>
    <%= javascript_pack_tag 'hello_angular' %>
    ```

3. Make frontend view default in `config/routes.rb` with

    ```ruby
    Rails.application.routes.draw do
      root 'frontend#index'
      get 'frontend/index'
    end
    ```

4. Create new SCSS file for custom styles for the angular app by creating the file `app/javascript/hello_angular/app/app.component.scss` with content

    ```scss
    h1 {
      color: red;
    }
    ```
    
5. Edit `app/javascript/hello_angular/app/app.component.ts` and include `app.component.scss` file

    ```typescript
    import { Component } from '@angular/core';
    import styleString from './app.component.scss';
    
    
    @Component({
      selector: 'hello-angular',
      template: `<h1>Hello {{name}}</h1>`,
      styles: [ styleString ]
    })
    
    export class AppComponent {
      name = 'Angular';
    }
    ```

6. Add scss module declaration in new file `app/javascript/hello_angular/scss.d.ts` with content

    ```typescript
    declare module "*.scss" {
      const content: string
      export default content
    }
    ```

7. Add SCSS loader for webpacker in `config/webpack/environment.js`

    ```javascript
    const { environment } = require('@rails/webpacker')
    const typescript =  require('./loaders/typescript')


    environment.loaders.set('style', {
    test: /\.(scss|sass|css)$/,
        use: [{
            loader: "to-string-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "resolve-url-loader"
        }, {
            loader: "sass-loader"
        }]
    })
    
    environment.loaders.append('typescript', typescript)
    module.exports = environment
    ```

7. Add to-string-loader and resolve-url-loader with `yarn add to-string-loader resolve-url-loader`
8. Start Rails Server with `rails s` and open [http://localhost:3000](http://localhost:3000) in Browser