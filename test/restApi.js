/**
 * Copyright 2018 Scott Bender (scott@scottbender.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http');
const { getHttpURL, getAPIPath, config } = require('./utils')

chai.use(chaiHttp);

describe('REST API', () => {

  if ( config.supportsHTTP ) {
    it('Hello Message', async () => {
      let response = await chai.request(getHttpURL()).get('/signalk')
      expect(response).to.have.status(200)
      expect(response.body).to.be.a('object')
      
      const server = response.body.server
      expect(server, 'hello.server').to.be.a('object')
      expect(server.id, 'hello.server.id').to.be.a('string')
      expect(server.version, 'hello.server.version').to.be.a('string')
      
      expect(response.body.endpoints, 'hello.endpoints').to.be.a('object')
      expect(response.body.endpoints.v1, 'hello.endpoints.v1').to.be.a('object')
      
      const v1 = response.body.endpoints.v1
      expect(v1.version).to.be.a('string')
    })
  }
})
