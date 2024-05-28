import React from 'react';
import { compile, classes } from 'core/js/reactHelpers';

export default function BoxMenuGroup (props) {

  const {
    displayTitle,
    body,
    instruction
  } = props;

  return (
    <div className="menu-group__inner boxmenu-group__inner">

      <div className="menu-group__header boxmenu-group__header">
        <div className="menu-group__header-inner boxmenu-group__header-inner">

          {displayTitle &&
          <div className="menu-group__title boxmenu-group__title">
            <div
              className={classes([
                'menu-group__title-inner',
                'boxmenu-group__title-inner',
                'js-heading'
              ])}
              data-a11y-heading-type="menuGroup"
            />
          </div>
          }

          {body &&
          <div className="menu-group__body boxmenu-group__body">
            <div
              className="menu-group__body-inner boxmenu-group__body-inner"
              dangerouslySetInnerHTML={{ __html: compile(body) }}
            />
          </div>
          }

          {instruction &&
          <div className="menu-group__instruction boxmenu-group__instruction">
            <div
              className="menu-group__instruction-inner boxmenu-group__instruction-inner"
              dangerouslySetInnerHTML={{ __html: compile(instruction) }}
            />
          </div>
          }

          <div className={classes([
            'menu-group__progress',
            'boxmenu-group__progress',
            'js-menu-item-progress'
          ])}>
            {/* Menu item progress bar will render here */}
          </div>

        </div>
      </div>

      <div className="menu-group__container boxmenu-group__container">
        <div
          className={classes([
            'menu-group__item-container-inner',
            'boxmenu-group__item-container-inner',
            'js-group-children'
          ])}
          role="list"
        >
          {/* Grouped menu items render here */}
        </div>
      </div>

    </div>
  );
}
