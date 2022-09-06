import React, { useRef, useState } from 'react'
import { Link, Outlet, NavLink } from 'react-router-dom'

interface IProps {}

export function FuncDemo(props: IProps) {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            to="/func/new"
            className={({ isActive }) => (isActive ? 'active-me' : '')}
          >
            new
          </NavLink>
        </li>
        <li>
          <NavLink to="/func/old">old</NavLink>
        </li>
      </ul>
      <div style={{ background: 'pink' }}>
        <Outlet />
      </div>
    </div>
  )
}
