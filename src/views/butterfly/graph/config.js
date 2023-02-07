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
// dag-edge边的配置数据
export const commonEdage = {
    attrs: {
      line: {
        stroke: "#C2C8D5", // #e52e1a
        strokeWidth: 1,
        targetMarker: {
          name: "classic",
          size: 8
        }
      }
    },
    connector: {
      name: "algo-connector"
    },
    defaultLabel: {
      markup: [
        {
          tagName: "rect",
          selector: "body"
        },
        {
          tagName: "text",
          selector: "label"
        }
      ],
      attrs: {
        label: {
          fontSize: 14,
          textAnchor: "middle",
          textVerticalAnchor: "middle",
          pointerEvents: "none",
          fill: "#2CFEFF"
        }
      },
      position: {
        distance: 0.5
      }
    },
    // labels: "是",
    router: {
      name: "manhattan"
    },
    zIndex: 0
  };