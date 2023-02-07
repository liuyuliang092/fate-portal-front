/**
 *
 *  Copyright 2019 The FATE Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
const endpoints = [
    {
      id: 'right',
      orientation: [1, 0],
      pos: [0, 0.5]
    },
    {
      id: 'left',
      orientation: [-1, 0],
      pos: [0, 0.5]
    }
  ];
  
  export default {
    groups: [
      {
        id: '1',
        left: 10,
        top: 20,
      },
    ],
    nodes: [
      {
        id: '1',
        group: '1',
        top: 40,
        left: 20,
        endpoints: endpoints,
      },
      {
        id: '2',
        top: 50,
        left: 300,
        endpoints: endpoints,
      },
    ],
    edges: [{
      id: '1-2',
      sourceNode: '1',
      targetNode: '2',
      source: 'right',
      target: 'left',
    }],
  };