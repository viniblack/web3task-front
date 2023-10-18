import { forwardRef, Ref, useState, ReactElement, ChangeEvent } from "react";
import {
  Avatar,
  Link,
  Box,
  Grid,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  Theme,
  Tooltip,
  Typography,
  DialogContent,
  Slide,
  Hidden,
  useMediaQuery,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import FindInPageTwoToneIcon from "@mui/icons-material/FindInPageTwoTone";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import { Dialog, TextField, DialogTitle } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import HeaderNotifications from "../Buttons/Notifications";
import HeaderToggleTheme from "../Buttons/ToggleTheme";

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-container {
          height: auto;
      }
      
      .MuiDialog-paperScrollPaper {
          max-height: calc(100vh - 64px)
      }
  `
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
      background: ${theme.colors.alpha.white[100]};
      border-radius: 10px;
      .MuiInputBase-input {
          font-size: ${theme.typography.pxToRem(17)};
      }
  `
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
      background: ${theme.colors.alpha.black[5]};
      padding: ${theme.spacing(3)}
  `
);

function HeaderSearch() {
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
    
    if (event.target.value) {
      if (!openSearchResults) {
        setOpen(true);
        setOpenSearchResults(true);
      }
    } else {
      setOpen(true);
      setOpenSearchResults(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
                
          <Hidden mdDown>
            { <Box >
              <Tooltip arrow title="Search">
                  <SearchInputWrapper
                    value={searchValue}
                    autoFocus={true}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchTwoToneIcon />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search terms here..."
                    fullWidth
                  />
              </Tooltip>  
            </Box>             }
          </Hidden>

    </>
  );
}

export default HeaderSearch;
