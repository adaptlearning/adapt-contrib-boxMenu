import React from 'react';
import Adapt from 'core/js/adapt';
import { classes, compile, templates } from 'core/js/reactHelpers';

export default function BoxMenuItem (props) {

  const {
    displayTitle,
    _graphic,
    body,
    duration,
    linkText,
    _isVisited,
    _isLocked,
    _isComplete,
    title,
    _isOptional,
    _nthChild,
    _totalChild
  } = props;

  const _globals = Adapt.course.get('_globals');

  const durationLabel = duration
    ? [_globals?._menu?._boxMenu?.durationLabel.trim(), duration].filter(Boolean).join(' ')
    : '';

  const visited = _isVisited ? _globals?._accessibility?._ariaLabels?.visited : '';
  const complete = _isComplete ? _globals?._accessibility?._ariaLabels?.complete : '';
  const completion = complete || visited;
  const locked = _isLocked ? _globals?._accessibility?._ariaLabels?.locked : linkText;
  const optional = _isOptional ? _globals?._accessibility?._ariaLabels?.optional : '';
  const itemCount = compile(_globals?._menu?._boxMenu?.itemCount || '', { _nthChild, _totalChild });
  const ariaLabel = [
    completion, locked, `${title}.`, `${itemCount}.`, `${optional}`
  ].filter(Boolean).join(' ');

  return (
    <div className="menu-item__inner boxmenu-item__inner">

      <templates.image {..._graphic}
        classNamePrefixes={['menu-item', 'boxmenu-item']}
        alt={null}
        attribution={null}
      />

      <div className="menu-item__details boxmenu-item__details">
        <div className="menu-item__details-inner boxmenu-item__details-inner">

          {displayTitle &&
          <div className="menu-item__title boxmenu-item__title">
            <div
              className={classes([
                'menu-item__title-inner',
                'boxmenu-item__title-inner',
                'js-heading'
              ])}
              data-a11y-heading-type="menuItem">
            </div>
          </div>
          }

          {_graphic?.alt &&
          <span
            className="aria-label"
            dangerouslySetInnerHTML={{ __html: compile(_graphic.alt) }}
          />
          }

          {body &&
          <div className="menu-item__body boxmenu-item__body">
            <div
              className="menu-item__body-inner boxmenu-item__body-inner"
              dangerouslySetInnerHTML={{ __html: compile(body) }}
            />
          </div>
          }

          {duration &&
          <div className="menu-item__duration boxmenu-item__duration">
            <div
              className="menu-item__duration-inner boxmenu-item__duration-inner"
              dangerouslySetInnerHTML={{ __html: compile(durationLabel, props) }}
            />
          </div>
          }

          <div className={classes([
            'menu-item__progress',
            'boxmenu-item__progress',
            'js-menu-item-progress'
          ])}>
            {/* Menu item progress bar will render here */}
          </div>

          <div className="menu-item__button-container boxmenu-item__button-container">
            <button
              className={classes([
                'btn-text',
                'menu-item__button',
                'boxmenu-item__button',
                'js-btn-click',
                _isVisited && 'is-visited',
                _isLocked && 'is-locked'
              ])}
              aria-label={ariaLabel}
              aria-disabled={_isLocked ? true : null}
              role="link"
              dangerouslySetInnerHTML={{ __html: compile(linkText) }}
            />

            <span className='menu-item__status boxmenu-item__status'>
              <span className='icon' aria-hidden="true" />
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
