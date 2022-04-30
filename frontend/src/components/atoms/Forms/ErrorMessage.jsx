import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../../theme/Colors'
import fonts from '../../../theme/font'

const ErrorStyled = styled.p`
  margin: 0px 0px 8px 10px;
  font-size: ${fonts.xss};
  font-style: oblique;
  color: ${colors.bloodRed};
`
function ErrorMessage({ error }) {
  return <ErrorStyled>{error}</ErrorStyled>
}

ErrorMessage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

export default styled(ErrorMessage)``
