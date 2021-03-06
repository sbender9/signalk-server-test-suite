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
const schema = require('@signalk/signalk-schema')

const { getHttpURL, getAPIPath, config } = require('./utils')

chai.use(chaiHttp)
chai.use(schema.chaiModule)

describe('REST API', () => {

  if ( config.supportsHTTP ) {
    it('Discovery', async () => {
      let response = await chai.request(getHttpURL()).get('/signalk')
      expect(response).to.have.status(200)
      expect(response.body).to.be.validDiscovery
    })

    it('Full', async () => {
      let response = await chai.request(getHttpURL()).get(getAPIPath('/'))
      expect(response).to.have.status(200)
      expect(response.body).to.be.validFullSignalK
    })
  }
})
