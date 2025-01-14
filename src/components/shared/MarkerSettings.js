/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow

import React, { PureComponent } from 'react';
import { Localized } from '@fluent/react';

import explicitConnect from 'firefox-profiler/utils/connect';
import { changeMarkersSearchString } from 'firefox-profiler/actions/profile-view';
import { getMarkersSearchString } from 'firefox-profiler/selectors/url-state';
import { PanelSearch } from './PanelSearch';
import { StackImplementationSetting } from 'firefox-profiler/components/shared/StackImplementationSetting';

import type { ConnectedProps } from 'firefox-profiler/utils/connect';

import 'firefox-profiler/components/shared/PanelSettingsList.css';
import './MarkerSettings.css';

type StateProps = {|
  +searchString: string,
|};

type DispatchProps = {|
  +changeMarkersSearchString: typeof changeMarkersSearchString,
|};

type Props = ConnectedProps<{||}, StateProps, DispatchProps>;

class MarkerSettingsImpl extends PureComponent<Props> {
  _onSearch = (value: string) => {
    this.props.changeMarkersSearchString(value);
  };

  render() {
    const { searchString } = this.props;
    return (
      <div className="markerSettings">
        <ul className="panelSettingsList">
          <StackImplementationSetting labelL10nId="StackSettings--stack-implementation-label" />
        </ul>
        <Localized
          id="MarkerSettings--panel-search"
          attrs={{ label: true, title: true }}
        >
          <PanelSearch
            className="markerSettingsSearchField"
            label="Filter Markers:"
            title="Only display markers that match a certain name"
            currentSearchString={searchString}
            onSearch={this._onSearch}
          />
        </Localized>
      </div>
    );
  }
}

export const MarkerSettings = explicitConnect<{||}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    searchString: getMarkersSearchString(state),
  }),
  mapDispatchToProps: { changeMarkersSearchString },
  component: MarkerSettingsImpl,
});
