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